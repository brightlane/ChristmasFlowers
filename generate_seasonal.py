import os

topic = os.environ.get("SELECTED_TOPIC", "Christmas Flowers")
affiliate = "https://www.floristone.com/index.cfm?source_id=christmas&AffiliateID=2013017799"

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Christmas Flowers - {topic}</title>
  <meta name="description" content="{topic} — expert 2026 Christmas flower delivery tips and holiday floral inspiration.">
  <link rel="canonical" href="https://brightlane.github.io/ChristmasFlowers/seasonal.html" />
  <style>
    body{{font-family:Georgia,serif;line-height:1.7;max-width:850px;margin:auto;padding:30px;background:#fffafa;color:#1b5e20;}}
    h1{{color:#c62828;}}
    .hero{{background:linear-gradient(135deg,#c62828,#1b5e20);color:white;padding:40px;border-radius:16px;text-align:center;margin-bottom:40px;}}
    .card{{background:white;padding:25px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);margin-bottom:30px;}}
    .cta{{display:inline-block;background:#c62828;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:20px;}}
    footer{{margin-top:50px;padding:20px;border-top:1px solid #c62828;text-align:center;font-family:sans-serif;}}
    footer nav a{{margin:0 6px;color:#1b5e20;text-decoration:none;}}
  </style>
</head>
<body>
  <div class="hero">
    <h1>{topic}</h1>
    <p>Christmas flower inspiration, holiday delivery ideas, and festive bouquet trends for 2026.</p>
    <a class="cta" href="{affiliate}">Shop Christmas Flowers</a>
  </div>

  <div class="card">
    <h2>Holiday Flower Trends for 2026</h2>
    <p>Seasonal floral arrangements continue growing in popularity as families decorate homes,
    offices, churches, and holiday events with elegant winter greenery and festive bouquets.</p>
    <p>Professional florist delivery ensures fresher flowers, better presentation, and reliable
    same-day arrival during the busiest holiday shopping weeks of the year.</p>
  </div>

  <div class="card">
    <h2>Why Christmas Flowers Make Perfect Gifts</h2>
    <p>Floral gifts create emotional connections and instantly brighten holiday celebrations.
    Popular seasonal arrangements include poinsettias, roses, cedar wreaths, winter berries,
    pine accents, and elegant centerpieces.</p>
    <p>Last-minute delivery options make it easy to surprise loved ones even on Christmas Eve.</p>
  </div>

  <footer>
    <nav>
      <a href="index.html">Home</a> |
      <a href="blog.html">Holiday Blog</a> |
      <a href="regional.html">Regional Guide</a> |
      <a href="faq.html">FAQ</a> |
      <a href="sitemap.xml">Sitemap</a>
    </nav>
    <p style="margin-top:20px;">
      🎅 <a href="{affiliate}"><strong>Order Christmas Flowers via FloristOne</strong></a>
    </p>
  </footer>
</body>
</html>"""

with open("seasonal.html", "w") as f:
    f.write(html)

print(f"seasonal.html written: {topic}")
