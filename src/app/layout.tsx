import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import ThemeToggle from '@/components/ThemeToggle';
import { FEEDS } from '@/types/hackernews';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-serif' });

const description = 'A fast Hacker News reader: Top, New, Best, Ask, Show and Jobs from the official API, with working pagination and a paper theme.';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinandansharma.github.io/hacker-news-clone/'),
  title: 'Hacker News Reader',
  description,
  openGraph: { type: 'website', url: 'https://abhinandansharma.github.io/hacker-news-clone/', title: 'Hacker News Reader', description, images: [{ url: 'og.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', creator: '@notjustadev', title: 'Hacker News Reader', description, images: ['og.png'] },
};

export const viewport: Viewport = { themeColor: '#f4f1e8' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${serif.variable}`}>
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
          <span>Built by <a href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer">Abhinandan Sharma</a> · <a href="https://github.com/abhinandansharma/hacker-news-clone" target="_blank" rel="noreferrer">Source</a></span>
        </footer>
        <a className="made-by" href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer" aria-label="Made by Abhinandan Sharma. Opens the portfolio."><span className="made-by-dot"></span>Made by Abhinandan <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
      </body>
    </html>
  );
}
