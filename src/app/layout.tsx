import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import { FEEDS } from '@/types/hackernews';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker News Reader',
  description: 'A fast Hacker News reader: Top, New, Best, Ask, Show and Jobs from the official API, with working pagination.',
};

export const viewport: Viewport = { themeColor: '#ff6600' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="hdr">
          <div className="wrap hdr-inner">
            <Link href="/" className="mark"><i>Y</i><span>Hacker News</span></Link>
            <nav className="tabs" aria-label="Feeds">
              {FEEDS.map((f) => <NavLink key={f.type} href={f.path}>{f.label}</NavLink>)}
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap ftr">
          <span>Data from the <a href="https://github.com/HackerNews/API" target="_blank" rel="noreferrer">official Hacker News API</a>. Not affiliated with Y Combinator.</span>
          <span>Built by <a href="https://abhinandansharma.github.io/portfolio/" target="_blank" rel="noreferrer">Abhinandan Sharma</a> · <a href="https://github.com/abhinandansharma/hacker-news-clone" target="_blank" rel="noreferrer">Source</a></span>
        </footer>
      </body>
    </html>
  );
}
