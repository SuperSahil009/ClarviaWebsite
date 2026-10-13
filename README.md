# Clarvia Wellness

A lightweight static website for [clarviawellness.com](https://clarviawellness.com), built with plain HTML, CSS, and JavaScript.

## Project structure

- `index.html` — page content and metadata
- `css/styles.css` — colors, layout, and responsive styling
- `js/main.js` — mobile navigation, header state, reveal effects, and footer year
- `assets/` — website images and icons
- `robots.txt` and `sitemap.xml` — search-engine files

## Preview locally

You can open `index.html` directly, or serve the folder with any static web server. For example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to Hostinger

Connect this repository in Hostinger under **Websites → Dashboard → Advanced → Git**. Deploy the `main` branch to `public_html` and enable automatic deployment when ready.

The root of `public_html` should contain `index.html`, not an extra nested project folder.
