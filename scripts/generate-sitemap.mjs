import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://rozanabi.com').replace(/\/$/, '');
const publicDir = join(process.cwd(), 'public');
const today = new Date().toISOString().slice(0, 10);

const priorityMap = new Map([
  ['/', '1.00'],
  ['/services', '0.85'],
  ['/landing-page-oman', '0.85'],
  ['/about', '0.80'],
  ['/contact', '0.80'],
  ['/industries', '0.80'],
  ['/insights', '0.80'],
  ['/use-cases', '0.80'],
  ['/faq', '0.55'],
]);

const weekly = new Set(['/', '/insights', '/landing-page-oman']);
const monthlyLow = new Set(['/privacy-policy', '/cookie-policy', '/terms-conditions']);

function attrValue(html, attrName, attrValueName, targetAttr = 'content') {
  const pattern = new RegExp(`<[^>]+${attrName}=["']${attrValueName}["'][^>]*>`, 'i');
  const tag = html.match(pattern)?.[0];
  if (!tag) return '';
  const target = tag.match(new RegExp(`${targetAttr}=["']([^"']+)["']`, 'i'));
  return target ? target[1].trim() : '';
}

function canonicalFromHtml(html) {
  const tag = html.match(/<link\b(?=[^>]*rel=["']canonical["'])([^>]*)>/i)?.[0];
  const href = tag?.match(/href=["']([^"']+)["']/i)?.[1] || '';
  if (!href.startsWith(SITE_URL)) return '';
  return href.replace(SITE_URL, '') || '/';
}

const urls = [];
for (const file of readdirSync(publicDir).filter((f) => f.endsWith('.html')).sort()) {
  const full = join(publicDir, file);
  const html = readFileSync(full, 'utf8');
  const robots = attrValue(html, 'name', 'robots').toLowerCase();
  if (robots.includes('noindex')) continue;
  const path = canonicalFromHtml(html);
  if (!path) continue;
  const priority = priorityMap.get(path) || (path.startsWith('/insight-') || path.startsWith('/use-case-') ? '0.70' : monthlyLow.has(path) ? '0.45' : '0.70');
  const changefreq = weekly.has(path) ? 'weekly' : 'monthly';
  urls.push({ path, lastmod: today, changefreq, priority });
}

const unique = [...new Map(urls.map((u) => [u.path, u])).values()].sort((a, b) => {
  if (a.path === '/') return -1;
  if (b.path === '/') return 1;
  return a.path.localeCompare(b.path);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map((u) => `  <url>\n    <loc>${SITE_URL}${u.path === '/' ? '/' : u.path}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;

writeFileSync(join(publicDir, 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${unique.length} indexable URLs for ${SITE_URL}`);
