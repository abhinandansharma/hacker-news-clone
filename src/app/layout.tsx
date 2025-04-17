import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker News Clone',
  description: 'A modern clone of Hacker News built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <nav className="bg-[rgb(var(--card-bg))]/80 backdrop-blur-sm border-b border-[rgb(var(--border-rgb))] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-[rgb(var(--accent-rgb))]">
                      HN
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <NavLink href="/">Top</NavLink>
                    <NavLink href="/new">New</NavLink>
                    <NavLink href="/best">Best</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 