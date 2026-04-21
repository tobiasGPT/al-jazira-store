# Al Jazira Club — Official Store (Concept)

A high-fidelity, static-HTML concept for the Al Jazira Club official online store. Built as a design prototype — editorial-grade retail for one of Abu Dhabi's most historic football clubs.

**Live demo:** once deployed, GitHub Pages URL will appear in the repo About section.

## What's inside

- **`index.html`** — Homepage: video hero (theme-aware), editorial banners, 8 product sections, Shop By Player, Shop by Category, newsletter, full glass nav & footer.
- **`product.html`** — Product detail page with gallery, sizes, quantity stepper, cart drawer.
- **`all-products.html`** — Full catalogue with category filter chips, sort, deep-linking.
- **`checkout.html`** — Glass-card checkout with contact, delivery, payment, order summary, and success state.
- **Custom jersey builder** — Live nameset preview (name + number + font style) with colour-matched printed-nameset card.

## Design systems

- **Kit colour modes** — Home (red) / Away (dark) / Third (cream) as full site themes. Persists in `localStorage`. Hero video swaps per kit.
- **Bilingual EN / AR** — Every visible string translates on the fly, layout flips to RTL, font switches to Tajawal. Persists in `localStorage`.
- **Liquid glass UI** — visionOS-style frosted glass on nav, toggles, CTAs, cards, drawer, and scroll-to-top. Tuned per theme.
- **Typography** — Barlow + Barlow Condensed for display, Tajawal for Arabic.

## Files

| File | Purpose |
|---|---|
| `lang.js` | Translation dictionary + language toggle logic |
| `lang.css` | Arabic font, RTL layout, language pill |
| `jerseys/` | Flat-lay product photography (home-flat.png, away-model.webp, etc.) |
| `hero-home.mp4` / `hero-away.mp4` | Kit-specific hero video |
| `hero-player-1800.jpg` | Video poster / fallback |

## Run locally

Any static server. Simplest:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` — everything is local-first.

## Status

Concept / pitch deck. Not affiliated with the actual Al Jazira Club or its official retail partners.
