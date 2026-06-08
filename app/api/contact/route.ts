import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import * as tls from 'node:tls';

export const runtime = 'nodejs';

type FieldMap = Record<string, string>;

const allowedContactMethods = ['Email', 'E-Mail', 'Call', 'Anruf', 'Phone', 'WhatsApp', 'Telegram', 'Any'];
const allowedServices = [
  'Market & Competitor Analysis',
  'Strategy & Predictive Insights',
  'Process & Operational Analysis',
  'Data-Driven Decision Making',
  'SEO & Organic Growth',
  'Social Media Marketing',
  'Content Marketing',
  'PPC & Paid Media Management',
  'Web Design & Development',
  'Landing Page Design and Optimization',
  'Request a Free Landing Page Review',
  'Mobile App Development',
  'Email Marketing',
  'General Consulting Inquiry',
  'Not Sure Yet',
];
const allowedScopes = [
  'Market & competitor analysis',
  'Strategy & predictive insights',
  'Process & operational analysis',
  'Data-driven decision support',
  'SEO & organic growth',
  'Social media marketing',
  'Content marketing',
  'PPC & paid media',
  'Web design & development',
  'Landing page design & optimization',
  'Mobile app development',
  'Email marketing',
  'Ongoing monthly support',
  'Discovery / not sure yet',
];
const allowedTimelines = ['Immediately', 'Within 1 month', '1–3 months', '3–6 months', 'Exploring options'];
const allowedMarkets = ['Oman', 'GCC', 'International / Other'];
const allowedRequestTypes = ['free_landing_page_review', 'landing_page_design_optimization', 'seo_organic_growth', ''];
const allowedLandingPackages = ['', 'starter-120', 'professional-150', 'local-growth-220', 'ai-ready-280'];

const rateMap = new Map<string, { count: number; resetAt: number }>();
let lastRateCleanupAt = 0;

type SmtpMailOptions = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function getSecret() {
  const secret = process.env.CONTACT_CSRF_SECRET || process.env.NEXTAUTH_SECRET;
  if (secret) return secret;
  if (isProduction()) throw new Error('CONTACT_CSRF_SECRET is not configured.');
  return 'rozana-local-dev-secret-change-me';
}

function configurationError(message: string) {
  console.error(`Rozana contact configuration error: ${message}`);
  return json(500, { ok: false, message: 'The contact form is not fully configured. Please email contact@rozanabi.com directly.' });
}

function validateCsrf(token: string) {
  const secret = getSecret();
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('.');
    if (parts.length !== 3) return false;
    const [ts, nonce, sig] = parts;
    if (!/^\d+$/.test(ts) || !/^[a-f0-9]{32}$/i.test(nonce)) return false;
    const age = Math.floor(Date.now() / 1000) - Number(ts);
    if (age < 0 || age > 60 * 60 * 2) return false;
    const expected = crypto.createHmac('sha256', secret).update(`${ts}.${nonce}`).digest('base64url');
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

function singleLine(value: FormDataEntryValue | null, max = 180) {
  return String(value || '')
    .replace(/[\u0000\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function multiLine(value: FormDataEntryValue | null, max = 4000) {
  return String(value || '')
    .replace(/[\u0000\r]+/g, '')
    .trim()
    .slice(0, max);
}

function isEmail(value: string) {
  const email = value.trim();
  if (email.length < 6 || email.length > 254) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domainRaw] = parts;
  const domain = domainRaw.toLowerCase();
  if (!local || !domain || local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
  if (domain.length > 253 || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  const tld = labels[labels.length - 1];
  if (!/^[a-z]{2,63}$/i.test(tld)) return false;
  return labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

function safeRedirect(value: FormDataEntryValue | null) {
  const fallback = '/thank-you';
  const raw = singleLine(value, 300);
  if (!raw) return fallback;
  try {
    const url = new URL(raw, 'https://rozanabi.com');
    if (url.origin !== 'https://rozanabi.com') return fallback;
    const allowedPaths = new Set(['/thank-you', '/thank-you.html']);
    if (!allowedPaths.has(url.pathname)) return fallback;
    return `${url.pathname === '/thank-you.html' ? '/thank-you' : url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

async function reportContactError(label: string, error: unknown, context: Record<string, unknown> = {}) {
  const webhook = process.env.CONTACT_ERROR_WEBHOOK_URL;
  const message = error instanceof Error ? error.message : String(error || 'Unknown error');
  console.error(`Rozana contact ${label}:`, message, context);
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, message, context, at: new Date().toISOString() }),
    });
  } catch (webhookError) {
    console.error('Rozana contact error webhook failed:', webhookError instanceof Error ? webhookError.message : 'Unknown webhook error');
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char] || char));
}


function parseEmailAddress(value: string) {
  const input = value.trim();
  const match = input.match(/<([^<>\s]+@[^<>\s]+)>/);
  if (match) return match[1];
  return input.replace(/^mailto:/i, '').trim();
}

function encodeHeader(value: string) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;
}

function normalizeRecipients(value: string) {
  return value
    .split(',')
    .map((item) => parseEmailAddress(item))
    .filter((item) => isEmail(item));
}

function buildMimeMessage(options: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}) {
  const boundary = `rozana_${crypto.randomBytes(16).toString('hex')}`;
  const fromEmail = parseEmailAddress(options.from);
  const toEmails = normalizeRecipients(options.to);
  const date = new Date().toUTCString();
  const messageId = `<${crypto.randomBytes(16).toString('hex')}@rozanabi.com>`;

  const headers = [
    `From: ${options.from}`,
    `To: ${toEmails.join(', ')}`,
    `Reply-To: ${options.replyTo}`,
    `Subject: ${encodeHeader(options.subject)}`,
    `Date: ${date}`,
    `Message-ID: ${messageId}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join('\r\n');

  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    options.text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    options.html,
    '',
    `--${boundary}--`,
    '',
  ].join('\r\n');

  return { fromEmail, toEmails, raw: `${headers}\r\n\r\n${body}` };
}

function waitForSmtpResponse(socket: tls.TLSSocket, timeoutMs = 15000): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const timer = setTimeout(() => cleanup(new Error('SMTP response timed out')), timeoutMs);

    function cleanup(error?: Error, response?: string) {
      clearTimeout(timer);
      socket.off('data', onData);
      socket.off('error', onError);
      if (error) reject(error);
      else resolve(response || buffer);
    }

    function onError(error: Error) {
      cleanup(error);
    }

    function onData(chunk: Buffer) {
      buffer += chunk.toString('utf8');
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1] || '';
      if (/^\d{3} /.test(lastLine)) cleanup(undefined, buffer);
    }

    socket.on('data', onData);
    socket.on('error', onError);
  });
}

async function sendZohoSmtpMail(options: SmtpMailOptions) {
  const host = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  const user = process.env.ZOHO_SMTP_USER || '';
  const pass = process.env.ZOHO_SMTP_PASS || '';
  const timeoutMs = Math.max(5000, Number(process.env.ZOHO_SMTP_TIMEOUT_MS || 15000));
  if (!user || !pass) throw new Error('Zoho SMTP credentials are not configured.');

  const { fromEmail, toEmails, raw } = buildMimeMessage(options);
  if (!fromEmail || !toEmails.length) throw new Error('Email sender or recipient is not valid.');

  const socket = tls.connect({ host, port, servername: host, rejectUnauthorized: true });
  let quitCompleted = false;
  socket.setTimeout(timeoutMs, () => socket.destroy(new Error('SMTP socket timed out')));

  function assertCode(response: string, allowed: number[], label: string) {
    const code = Number(response.slice(0, 3));
    if (!allowed.includes(code)) throw new Error(`SMTP command failed at ${label}: ${code}`);
  }

  async function command(commandText: string | null, allowed: number[], label: string) {
    if (commandText) socket.write(`${commandText}\r\n`);
    const response = await waitForSmtpResponse(socket, timeoutMs);
    assertCode(response, allowed, label);
    return response;
  }

  try {
    await command(null, [220], 'connect');
    await command('EHLO rozanabi.com', [250], 'ehlo');
    await command('AUTH LOGIN', [334], 'auth');
    await command(Buffer.from(user, 'utf8').toString('base64'), [334], 'auth-user');
    await command(Buffer.from(pass, 'utf8').toString('base64'), [235], 'auth-pass');
    await command(`MAIL FROM:<${fromEmail}>`, [250], 'mail-from');
    for (const recipient of toEmails) {
      await command(`RCPT TO:<${recipient}>`, [250, 251], 'rcpt-to');
    }
    await command('DATA', [354], 'data');
    socket.write(`${raw.replace(/^\./gm, '..')}\r\n.\r\n`);
    await command(null, [250], 'data-body');
    await command('QUIT', [221], 'quit');
    quitCompleted = true;
  } finally {
    socket.setTimeout(0);
    if (quitCompleted) socket.end();
    else socket.destroy();
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendZohoSmtpMailWithRetry(options: SmtpMailOptions) {
  const attempts = Math.min(Math.max(Number(process.env.ZOHO_SMTP_RETRY_ATTEMPTS || 2), 1), 3);
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await sendZohoSmtpMail(options);
      return;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : '';
      const isPermanent = /credentials|auth-pass|auth-user|Email sender|recipient is not valid/i.test(message);
      if (isPermanent || attempt === attempts) break;
      await sleep(600 * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error('SMTP send failed.');
}

function validateChoice(value: string, allowed: string[], label: string) {
  if (!allowed.includes(value)) throw new Error(`Please select a valid ${label}.`);
}

function cleanupRateMap(now: number) {
  if (now - lastRateCleanupAt < 60 * 1000) return;
  lastRateCleanupAt = now;
  for (const [key, value] of rateMap.entries()) {
    if (value.resetAt < now) rateMap.delete(key);
  }
}

function rateLimit(req: NextRequest) {
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX || 8);
  cleanupRateMap(now);
  const current = rateMap.get(ip);
  if (!current || current.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}

async function verifyTurnstile(token: string, req: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isProduction()) throw new Error('TURNSTILE_SECRET_KEY is not configured.');
    return true;
  }
  if (!token) return false;
  const ip = req.headers.get('cf-connecting-ip') || undefined;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await response.json().catch(() => null);
  return Boolean(data?.success);
}

function originAllowed(req: NextRequest) {
  const origin = req.headers.get('origin') || req.headers.get('referer') || '';
  if (!origin) return true;
  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    const requestHost = req.headers.get('host')?.split(':')[0]?.toLowerCase();
    const allowed = new Set(['rozanabi.com', 'www.rozanabi.com']);
    if (requestHost) allowed.add(requestHost);
    return allowed.has(host) || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

function buildEmail(fields: FieldMap) {
  const allRows: [string, string][] = [
    ['First Name', fields.firstName],
    ['Last Name', fields.lastName],
    ['Company / Business Name', fields.company],
    ['Email', fields.email],
    ['Phone', fields.phone],
    ['Preferred Contact Method', fields.contactMethod],
    ['Service', fields.service],
    ['Project Scope', fields.scope],
    ['Timeline', fields.timeline],
    ['Market', fields.market],
    ['Website URL', fields.projectWebsite],
    ['Instagram Account / Username', fields.instagramUrl],
    ['Business Field', fields.businessSector],
    ['Request Type', fields.requestType],
    ['Request Source', fields.requestSource],
    ['Landing Package', fields.landingPackageLabel],
    ['Package Price', fields.landingPackagePrice],
    ['Package ID', fields.landingPackage],
    ['Page URL', fields.pageUrl],
    ['Submitted At', new Date().toISOString()],
  ];

  const rows = allRows.filter(([, value]) => value.trim().length > 0);

  const rowHtml = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#5b5863;font-weight:600;width:190px;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#17151f;">${escapeHtml(value)}</td>
    </tr>`).join('');

  const messageHtml = escapeHtml(fields.message).replace(/\n/g, '<br />');
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f7f4ff;padding:24px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #ece7f7;">
        <div style="background:#24133f;color:#fff;padding:22px 24px;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">New Rozana website inquiry</h1>
          <p style="margin:8px 0 0;color:#e9ddff;">${escapeHtml(fields.company)} — ${escapeHtml(fields.service)}</p>
        </div>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">${rowHtml}</table>
        <div style="padding:18px 24px;">
          <h2 style="font-size:16px;margin:0 0 10px;color:#24133f;">Message</h2>
          <div style="background:#faf9fe;border:1px solid #eee8fb;border-radius:12px;padding:14px;color:#17151f;line-height:1.6;">${messageHtml}</div>
        </div>
      </div>
    </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n') + `\n\nMessage:\n${fields.message}`;
  return { html, text };
}

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return json(403, { ok: false, message: 'Form origin rejected.' });
  if (!rateLimit(req)) return json(429, { ok: false, message: 'Too many attempts. Please wait a few minutes and try again.' });

  const form = await req.formData();
  const honeypot = singleLine(form.get('website'), 300);
  if (honeypot) return json(400, { ok: false, message: 'Invalid form submission.' });

  const csrf = singleLine(form.get('rz_csrf_token'), 500);
  try {
    if (!validateCsrf(csrf)) return json(403, { ok: false, message: 'Security token expired. Please refresh the page and try again.' });
  } catch (error) {
    return configurationError(error instanceof Error ? error.message : 'CSRF configuration failed.');
  }

  const fields: FieldMap = {
    firstName: singleLine(form.get('firstName'), 80),
    lastName: singleLine(form.get('lastName'), 80),
    company: singleLine(form.get('company'), 160),
    email: singleLine(form.get('email'), 180),
    phone: singleLine(form.get('phone'), 80),
    contactMethod: singleLine(form.get('contactMethod'), 60),
    service: singleLine(form.get('service'), 180),
    scope: singleLine(form.get('scope'), 180),
    timeline: singleLine(form.get('timeline'), 80),
    market: singleLine(form.get('market'), 80),
    projectWebsite: singleLine(form.get('projectWebsite'), 300),
    instagramUrl: singleLine(form.get('instagramUrl'), 180),
    businessSector: singleLine(form.get('businessSector'), 160),
    requestType: singleLine(form.get('requestType'), 120),
    requestSource: singleLine(form.get('requestSource'), 120),
    landingPackage: singleLine(form.get('landingPackage'), 80),
    landingPackageLabel: singleLine(form.get('landingPackageLabel'), 180),
    landingPackagePrice: singleLine(form.get('landingPackagePrice'), 80),
    pageUrl: singleLine(form.get('pageUrl'), 500),
    message: multiLine(form.get('message'), 4000),
  };

  const required = ['firstName', 'lastName', 'company', 'email', 'phone', 'contactMethod', 'service', 'scope', 'timeline', 'market', 'businessSector', 'message'];
  for (const key of required) {
    if (!fields[key]) return json(422, { ok: false, message: 'Please complete all required fields before sending.' });
  }
  const instagramRequired = fields.requestType.includes('landing') || ['Landing Page Design and Optimization', 'Request a Free Landing Page Review', 'Social Media Marketing'].includes(fields.service);
  if (instagramRequired && !fields.instagramUrl) {
    return json(422, { ok: false, message: 'Please enter your Instagram account or relevant social profile for this request.' });
  }
  if (!isEmail(fields.email)) return json(422, { ok: false, message: 'Please enter a valid email address.' });

  try {
    validateChoice(fields.contactMethod, allowedContactMethods, 'contact method');
    validateChoice(fields.service, allowedServices, 'service');
    validateChoice(fields.scope, allowedScopes, 'project scope');
    validateChoice(fields.timeline, allowedTimelines, 'timeline');
    validateChoice(fields.market, allowedMarkets, 'market');
    validateChoice(fields.requestType, allowedRequestTypes, 'request type');
    validateChoice(fields.landingPackage, allowedLandingPackages, 'landing page package');
  } catch (error) {
    return json(422, { ok: false, message: error instanceof Error ? error.message : 'Invalid form selection.' });
  }

  let turnstileOk = false;
  try {
    turnstileOk = await verifyTurnstile(singleLine(form.get('cf-turnstile-response'), 1000), req);
  } catch (error) {
    return configurationError(error instanceof Error ? error.message : 'Turnstile configuration failed.');
  }
  if (!turnstileOk) return json(403, { ok: false, message: 'Security verification failed. Please try again.' });

  const to = process.env.CONTACT_TO_EMAIL || 'contact@rozanabi.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Rozana Website <contact@rozanabi.com>';

  const isLanding = fields.service.includes('Landing Page') || fields.requestType.includes('landing');
  const subject = isLanding
    ? `New landing page request: ${fields.company}${fields.landingPackageLabel ? ` - ${fields.landingPackageLabel}` : ''}`
    : `New Rozana inquiry: ${fields.company} - ${fields.service}`;
  const { html, text } = buildEmail(fields);

  try {
    await sendZohoSmtpMailWithRetry({
      from,
      to,
      replyTo: fields.email,
      subject,
      html,
      text,
    });
    return json(200, { ok: true, message: 'Your inquiry has been received.', redirect: safeRedirect(form.get('redirect')) });
  } catch (error) {
    await reportContactError('email failed', error, { service: fields.service, requestType: fields.requestType });
    return json(500, { ok: false, message: 'The message could not be sent. Please try again or email contact@rozanabi.com directly.' });
  }
}
