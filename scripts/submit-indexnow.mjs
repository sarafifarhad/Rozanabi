import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://rozanabi.com').replace(/\/$/, '');
const host = new URL(SITE_URL).host;
const defaultKey = '38261a077fc87a7b88a796f9fa658062';
const key = process.env.INDEXNOW_KEY || defaultKey;
const keyLocation = `${SITE_URL}/${key}.txt`;
const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');

if (!existsSync(sitemapPath)) {
  console.log('IndexNow skipped: public/sitemap.xml not found.');
  process.exit(0);
}

const sitemap = readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) {
  console.log('IndexNow skipped: sitemap has no URLs.');
  process.exit(0);
}

if (!globalThis.fetch) {
  console.log('IndexNow skipped: fetch is unavailable in this Node runtime.');
  process.exit(0);
}

const payload = { host, key, keyLocation, urlList: urls };
try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow submission: HTTP ${response.status} for ${urls.length} URLs.`);
} catch (error) {
  console.log(`IndexNow submission skipped or failed: ${error.message}`);
  process.exit(0);
}
