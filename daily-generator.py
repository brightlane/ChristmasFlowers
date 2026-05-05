import os
import random
from datetime import datetime

AFF = "https://www.floristone.com/main.cfm?affiliate_id=2013017799&occ=cm&source_id=aff"

today = datetime.now().strftime("%Y-%m-%d")

# 🌸 Topic library
topics = [
    {
        "name": "Birthday Flowers",
        "slug": "birthday",
        "intro": "Birthday flowers are a perfect way to celebrate someone's special day with color and joy.",
        "keywords": "birthday flowers, birthday bouquet, happy birthday flowers"
    },
    {
        "name": "Romantic Flowers",
        "slug": "romance",
        "intro": "Romantic flowers are a timeless way to express love and appreciation.",
        "keywords": "romantic flowers, roses, anniversary flowers"
    },
    {
        "name": "Sympathy Flowers",
        "slug": "sympathy",
        "intro": "Sympathy flowers offer comfort and support during difficult times.",
        "keywords": "sympathy flowers, funeral flowers, condolence bouquets"
    },
    {
        "name": "Christmas Flowers",
        "slug": "christmas",
        "intro": "Christmas flowers bring warmth, color, and holiday spirit into any home.",
        "keywords": "christmas flowers, holiday bouquets, poinsettias"
    },
    {
        "name": "Get Well Flowers",
        "slug": "get-well",
        "intro": "Get well flowers help lift spirits and bring positivity to recovery.",
        "keywords": "get well flowers, recovery bouquet"
    }
]

# 🎯 Rotate topic daily (stable, not random spam)
topic = topics[int(datetime.now().day) % len(topics)]

title = f"{topic['name']} Guide for {today}"

# 🧠 SEO Schema
schema = f"""
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title}",
  "datePublished": "{today}",
  "dateModified": "{today}",
  "author": {{
    "@type": "Organization",
    "name": "Brightlane"
  }},
  "mainEntityOfPage": {{
    "@type": "WebPage",
    "@id": "https://brightlane.github.io/blog/{today}.html"
  }}
}}
</script>
"""

# 📝 HTML content
html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>{title}</title>
<meta name="description" content="{topic['keywords']} - fresh ideas and delivery options.">

{schema}

</head>

<body style="font-family: Arial, sans-serif; max-width: 800px; margin:auto; padding:20px; line-height:1.6;">

<h1>{title}</h1>

<p>{topic['intro']}</p>

<p>
<a href="{AFF}" target="_blank">🌸 Shop Fresh Flowers Now</a>
</p>

<h2>Why Choose {topic['name']}?</h2>
<ul>
  <li>Perfect for emotional impact</li>
  <li>Same-day delivery available</li>
  <li>Beautiful seasonal arrangements</li>
</ul>

<p>
<a href="{AFF}&occasion={topic['slug']}" target="_blank">
👉 Browse {topic['name']}
</a>
</p>

<hr>

<p style="font-size:12px; color:gray;">
Affiliate disclosure: We may earn a commission at no extra cost to you.
</p>

</body>
</html>
"""

# 📁 Ensure blog folder exists
os.makedirs("blog", exist_ok=True)

# 💾 Write daily post
file_path = f"blog/{today}.html"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

# 🧭 Update blog index (latest link)
blog_index = f"""
<!DOCTYPE html>
<html>
<head>
<title>Blog</title>
</head>
<body style="font-family:Arial; max-width:800px; margin:auto; padding:20px;">

<h1>Daily Flower Blog</h1>

<p>Latest post:</p>

<a href="/blog/{today}.html">
👉 {title}
</a>

</body>
</html>
"""

with open("blog.html", "w", encoding="utf-8") as f:
    f.write(blog_index)

print("✅ Generated:", file_path)
print("✅ Updated blog.html")
