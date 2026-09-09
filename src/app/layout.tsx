import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import ThemeToggle from '@/components/ThemeToggle';
import { FEEDS } from '@/types/hackernews';
import './globals.css';

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-text' });
const pixel = localFont({ src: '../fonts/GeistPixel-Square.woff2', display: 'swap', variable: '--font-pixel', adjustFontFallback: false, fallback: ['ui-monospace', 'Menlo', 'monospace'] });

const description = 'A fast Hacker News reader: Top, New, Best, Ask, Show and Jobs from the official API, with working pagination and a paper theme.';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinandansharma.github.io/hacker-news-clone/'),
  title: 'Hacker News Reader',
  description,
  openGraph: { type: 'website', url: 'https://abhinandansharma.github.io/hacker-news-clone/', title: 'Hacker News Reader', description, images: [{ url: 'og.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', creator: '@notjustadev', title: 'Hacker News Reader', description, images: ['og.png'] },
};

export const viewport: Viewport = { themeColor: '#f2efe6' };

/* Applies the saved theme before first paint so a dark-mode visitor never sees a paper flash. */
const themeScript = `try{if(localStorage.getItem('hn-theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://hacker-news.firebaseio.com" />
        <link rel="preload" href="https://hacker-news.firebaseio.com/v0/topstories.json" as="fetch" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${grotesk.variable} ${pixel.variable}`}>
        <header className="hdr">
          <div className="wrap hdr-inner">
            <Link href="/" className="mark"><i>Y</i><span>Hacker News</span></Link>
            <nav className="tabs" aria-label="Feeds">
              {FEEDS.map((f) => <NavLink key={f.type} href={f.path}>{f.label}</NavLink>)}
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap ftr">
          <span>Data from the <a href="https://github.com/HackerNews/API" target="_blank" rel="noreferrer">official Hacker News API</a>. Not affiliated with Y Combinator.</span>
          <a href="https://github.com/abhinandansharma/hacker-news-clone" target="_blank" rel="noreferrer">Source</a>
        </footer>
        <a className="made-by" href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Made by Abhinandan Sharma. Opens the portfolio."><svg className="made-by-mark" viewBox="0 0 512 512" width="20" height="20" aria-hidden="true"><defs><clipPath id="mb-clip"><rect width="512" height="512" rx="112"/></clipPath></defs><rect width="512" height="512" rx="112" fill="#e0202a"/><g clipPath="url(#mb-clip)"><path d="M256 78 C156 78 100 154 100 254 L100 540 L412 540 L412 254 C412 154 356 78 256 78 Z" fill="#0b0b0b"/><path d="M404 206 Q470 178 518 132 Q492 224 410 252 Z" fill="#0b0b0b"/><path d="M406 232 Q468 240 512 292 Q462 262 408 250 Z" fill="#0b0b0b"/><path d="M118 232 Q256 196 394 232 L394 262 Q256 304 118 262 Z" fill="#f1ede4"/><path d="M152 248 L238 234 L242 270 L166 280 Z" fill="#0b0b0b"/><path d="M360 248 L274 234 L270 270 L346 280 Z" fill="#0b0b0b"/></g></svg><span>Made by <b>Abhinandan</b></span></a>
      </body>
    </html>
  );
}
