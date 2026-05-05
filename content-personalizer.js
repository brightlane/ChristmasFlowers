const fs = require('fs');

// PERSONALIZED CONTENT TEMPLATES
const CITY_INTROS = {
  'new-york': 'Brighten Manhattan this Christmas with ',
  'toronto': 'Warm Toronto winters with ',
  'chicago': 'Chicago\'s Windy City glows with ',
  'los-angeles': 'LA holiday sunshine shines through ',
  'miami': 'Miami\'s tropical Christmas blooms ',
  // Add 70+ cities...
};

const FLOWER_STORIES = {
  'poinsettias': 'iconic red poinsettias - the heart of Christmas tradition since Mexico\'s 17th century legend.',
  'red-roses': '12 long-stem red roses - timeless symbol of holiday love and passion.',
  'holly-wreaths': 'handcrafted holly wreaths with winter berries - Celtic origins meet modern festivity.',
  // 25+ flowers...
};

const PERSONALIZED_PAGE = (lang, adj, flower, city) => `
<!DOCTYPE html>
<html>
<head>
  <title>${adj.charAt(0).toUpperCase() + adj.slice(1)} ${flower.replace('-',' ')} Delivery in ${city.replace('-',' ').toUpperCase()} | Christmas Flowers</title>
  <meta name="description" content="${CITY_INTROS[city] || 'Celebrate '} ${adj} ${flower.replace('-',' ')} for Christmas ${city.toUpperCase()}. Same-day Dec 24 delivery. ${FLOWER_STORIES[flower] || ''}">
</head>
<body>
  <h1>${adj.toUpperCase()} ${flower.replace('-',' ').toUpperCase()} Delivery in ${city.toUpperCase()}</h1>
  
  <section>
    <h2>Why ${city.toUpperCase()} Loves ${flower.replace('-',' ').toUpperCase()}</h2>
    <p>${CITY_INTROS[city] || 'This holiday season, '} <strong>${adj} ${flower.replace('-',' ')}</strong> are ${city}'s favorite! ${uniqueStory(flower, city)} Same-day delivery Dec 24 guaranteed.</p>
  </section>
  
  <!-- Your FloristOne template here -->
  <section>FloristOne Christmas Content + AffiliateID=2013017799</section>
  
  <footer>Unique for ${city} - Christmas ${new Date().getFullYear()}</footer>
</body>
</html>`;

function uniqueStory(flower, city) {
  const stories = {
    'poinsettias': `Poinsettias light up ${city} homes - perfect for holiday parties!`,
    'red-roses': `Red roses warm ${city} hearts this Christmas Eve.`,
    // Unique per flower/city combo...
  };
  return stories[`${flower}-${city}`] || `${flower} perfect for ${city} winter wonderland!`;
}

// BATCH GENERATE (samples - scale to 1M)
const sampleUrls = fs.readFileSync('output/sitemap.txt', 'utf8').split('\n').slice(0, 100);
sampleUrls.forEach((urlLine, i) => {
  const parts = urlLine.split('/');
  const lang = parts[4].split('-')[0];
  const rest = parts[4].split('-').slice(1).join('-');
  const [adj, flower, cityPart] = rest.split('-delivery-in-');
  const city = cityPart;
  
  const uniqueHtml = PERSONALIZED_PAGE(lang, adj, flower, city);
  fs.writeFileSync(`output/pages/${i}-${city}-${flower}.html`, uniqueHtml);
  console.log(`✅ ${i + 1}: ${city} ${flower} personalized!`);
});

console.log('🎯 100 personalized pages ready → scale to 1M!');
