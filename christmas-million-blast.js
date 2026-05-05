#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ========================================
// 1M CHRISTMAS FLOWERS EMPIRE v1.0
// https://brightlane.github.io/ChristmasFlowers/
// ========================================

console.log('🎄 1M CHRISTMAS EMPIRE LAUNCHING...');

// CHRISTMAS THEMED
const CITIES_USA = ['new-york','los-angeles','chicago','houston','phoenix','philadelphia','san-antonio','san-diego','dallas','san-jose','austin','jacksonville','fort-worth','columbus','charlotte','indianapolis','san-francisco','seattle','denver','washington','boston','el-paso','nashville','detroit','oklahoma-city','portland','las-vegas','memphis','louisville','baltimore','milwaukee','albuquerque','tucson','fresno','mesa','sacramento','atlanta','kansas-city','colorado-springs','omaha','raleigh','miami','long-beach','virginia-beach','oakland','minneapolis','tulsa','arlington','tampa','new-orleans'];

const CITIES_CANADA = ['toronto','montreal','vancouver','calgary','edmonton','ottawa','winnipeg','quebec','hamilton','halifax','kitchener','london-on','victoria','windsor','oshawa','saskatoon','regina','st-johns','kelowna','barrie'];

const CITIES = [...CITIES_USA, ...CITIES_CANADA];

const CHRISTMAS_FLOWERS = [
  'poinsettias','red-roses','white-roses','holly-wreaths','evergreen-arrangements','winter-berries',
  'mistletoe-bunches','pine-cone-baskets','cypress-greens','fir-sprays','red-amaryllis','white-amaryllis',
  'christmas-cactus','holiday-mums','scarlet-cyclamen','snowy-azaleas','fir-wreaths','magnolia-garlands',
  'winter-jasmines','holiday-orchids','red-carnations','white-lilies','pine-wreaths','berry-branches'
]; // 25 Christmas flowers

const CHRISTMAS_ADJECTIVES = [
  'christmas','holiday','winter','festive','merry','noel','yuletide','seasonal','jolly','cheerful',
  'scarlet','crimson','evergreen','snowy','frosty','merry','bright','sparkling','radiant','glittering',
  'traditional','classic','victorian','rustic','elegant','opulent','lavish','sumptuous','divine','celestial'
]; // 30 Christmas adjectives

const LANGS = ['en','fr','es'];

console.log(`🎄 CHRISTMAS COMBOS: ${CITIES.length} cities × ${CHRISTMAS_FLOWERS.length} × ${CHRISTMAS_ADJECTIVES.length} × ${LANGS.length} = ${(CITIES.length * CHRISTMAS_FLOWERS.length * CHRISTMAS_ADJECTIVES.length * LANGS.length / 1000000).toFixed(1)}M`);

const urls = [];
LANGS.forEach(lang => {
  CHRISTMAS_ADJECTIVES.forEach(adj => {
    CHRISTMAS_FLOWERS.forEach(flower => {
      CITIES.forEach(city => {
        const cleanCity = city.replace('-on', '').replace('st-', 'st-');
        urls.push(`https://brightlane.github.io/ChristmasFlowers/${lang}-${adj}-${flower}-delivery-in-${cleanCity}.html`);
      });
    });
  });
});

console.log(`✅ Generated ${urls.length} Christmas URLs`);

// SITEMAP.TXT
fs.writeFileSync('output/sitemap.txt', urls.slice(0, 1000000).join('\n') + '\n');
console.log('📝 output/sitemap.txt ← 1M Christmas URLs');

// SPLIT SITEMAPS (50K each)
const CHUNK_SIZE = 50000;
const chunks = [];
for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
  chunks.push(urls.slice(i, i + CHUNK_SIZE));
}

chunks.forEach((chunk, index) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(url => `  <url><loc>${url.replace(/&/g, '&amp;')}</loc><lastmod>2026-05-05</lastmod><priority>0.9</priority></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(`output/sitemap-${(index + 1).toString().padStart(3, '0')}.xml`, xml);
  console.log(`📄 sitemap-${(index + 1).toString().padStart(3, '0')}.xml ← ${chunk.length} URLs`);
});

// MASTER INDEX
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.map((_, index) => `
  <sitemap>
    <loc>https://brightlane.github.io/ChristmasFlowers/sitemap-${(index + 1).toString().padStart(3, '0')}.xml</loc>
    <lastmod>2026-05-05</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;
fs.writeFileSync('output/sitemap.xml', indexXml);
console.log('🏆 output/sitemap.xml ← Christmas Master Index');

console.log('\n🎄 CHRISTMAS 1M EMPIRE READY!');
console.log('🚀 DEPLOY:');
console.log('  git add output/*');
