import datetime
import os

import requests
from dotenv import load_dotenv

load_dotenv()
NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}"


def create_post():
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error: NASA API returned {response.status_code}")
        return

    data = response.json()
    date_obj = datetime.datetime.now()
    date_str = date_obj.strftime("%Y-%m-%d")
    jekyll_date = date_obj.strftime("%Y-%m-%d 06:00:00 +0400")

    title = data.get("title", "NASA Photo of the Day")
    image_url = data.get("url", "")
    explanation = data.get("explanation", "").strip()

    file_name = f"_posts/{date_str}-nasa-apod.md"

    content = f"""---
layout: thread
title_en: "NASA: {title}"
title_ru: ""
date: {jekyll_date}
image: "{image_url}"
---
<div class="lang-en" markdown="1">
{explanation}
</div>

<div class="lang-ru" markdown="1">
</div>
"""
    with open(file_name, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Success: {file_name} created.")


if __name__ == "__main__":
    if not os.path.exists("_posts"):
        os.makedirs("_posts")
    create_post()
