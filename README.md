# Hacker News Reader

A paper-themed Hacker News reader on the Next.js App Router: Top, New, Best, Ask, Show and Jobs feeds from the
official Firebase API, fetched in the browser with a small cache, 30 stories a page with
working pagination, relative timestamps, and a dark mode that remembers itself.

**Live:** https://abhinandansharma.github.io/hacker-news-clone/

Each feed's first page is fetched at build time, so the static HTML already carries thirty stories and the browser refreshes them right after hydration. A scheduled workflow rebuilds every six hours to keep that snapshot fresh.

![Paper theme](screenshots/paper.png)

![Dark theme](screenshots/dark.png)

## Stack

Next.js 15 (static export), React 19, TypeScript, Tailwind CSS, Heroicons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000/hacker-news-clone
npm run build    # static export to out/
```

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to main.
