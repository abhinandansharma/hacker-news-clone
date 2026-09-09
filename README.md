# Hacker News Reader

A Hacker News reader on the Next.js App Router: Top, New, Best, Ask, Show and Jobs feeds from the official
Firebase API, fetched in the browser with a small cache, 30 stories a page with working pagination, relative
timestamps, a paper theme and a dark mode that remembers itself. Set in Space Grotesk with Geist Pixel numerals.

**Live:** https://abhinandansharma.github.io/hacker-news-clone/

Each feed's first page is fetched at build time, so the static HTML already carries thirty stories. The browser then
fetches the live feed and updates scores and comment counts in place; if the ranking has moved on, a pill offers the
latest order instead of reshuffling the list under you. Nothing on the page moves after first paint. A scheduled
workflow rebuilds every six hours to keep the snapshot fresh.

![Paper theme](screenshots/paper.png)

![Dark theme](screenshots/dark.png)

## Stack

Next.js 15 (static export), React, TypeScript, Tailwind CSS, date-fns.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000/hacker-news-clone
npm run build    # static export to out/
```

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to main.
