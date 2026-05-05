#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ========================================
// AUTO-INJECT 1M+ SITEMAP HIERARCHY
// Generates: sitemap.xml → indexes → 50K URL files
// ========================================

console.log('🔄 Auto-Injecting 1M+ Sitemap Hierarchy...');

// CONFIG: Your site base
const BASE_URL = 'https://brightlane.github.io/ChristmasFlowers/';
const MAX_URLS_PER_SITEMAP = 50000;
const CHUNK_SIZE = 1000; // Process in batches

// Step 1: READ your 1M+ URLs from sitemap.txt
const allUrls = fs.readFileSync('output/sitemap.txt', 'utf8')
  .split('\n')
  .filter(url => url.trim() && url.startsWith(BASE_URL))
  .map(url => url.trim().replace(/&/g, '&amp;'));

console.log(`📊 Found ${allUrls.length.toLocaleString()} total URLs`);

// Step 2: SPLIT into 50K sitemaps
const sitemapChunks = [];
for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_SITEMAP) {
  sitemapChunks.push(allUrls.slice(i, i + MAX_URLS_PER_SITEMAP));
}

console.log(`📦 Created ${sitemapChunks.length} sitemap files (50K each)`);

// Step 3: GENERATE individual sitemap-01.xml, sitemap-02.xml, etc.
sitemapChunks.forEach((chunk, index) => {
  const sitemapNum = (index + 1).toString().padStart(3, '0');
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
  
  fs.writeFileSync(`output/sitemap-${sitemapNum}.xml`, xmlContent);
  console.log(`✅ output/sitemap-${sitemapNum}.xml (${chunk.length} URLs)`);
});

// Step 4: CREATE SITEMAP INDEX (points to all sitemaps)
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapChunks.map((_, index) => {
  const sitemapNum = (index + 1).toString().padStart(3, '0');
  return `  <sitemap>
    <loc>${BASE_URL}sitemap-${sitemapNum}.xml</loc>
    <lastmod>2026-05-05</lastmod>
  </sitemap>`;
}).join('\n')}
</sitemapindex>`;

fs.writeFileSync('output/sitemap.xml', sitemapIndex);
console.log(`🏆 output/sitemap.xml ← MASTER INDEX (${sitemapChunks.length} sitemaps)`);

// Step 5: robots.txt update
const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}sitemap.xml
Crawl-delay: 1`;
fs.writeFileSync('robots.txt', robotsTxt);
console.log('🤖 robots.txt ← Updated with sitemap');

console.log('\n🎉 1M+ SITEMAP HIERARCHY COMPLETE!');
console.log('🚀 DEPLOY:');
console.log('  git add output/ robots.txt');
console.log('  git commit -m "auto-injected 1M sitemap hierarchy"');
console.log('  git push origin main');
console.log('\n📊 LIVE STRUCTURE:');
console.log('  ROOT:  ' + BASE_URL + 'sitemap.xml');
console.log('  FILES: ' + BASE_URL + 'sitemap-001.xml → sitemap-020.xml');
con
