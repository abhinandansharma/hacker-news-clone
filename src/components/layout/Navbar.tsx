'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Top' },
  { href: '/new', label: 'New' },
  { href: '/best', label: 'Best' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              Hacker News Clone
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'px-3 py-2 rounded-md text-sm font-medium',
                      pathname === item.href
                        ? 'bg-orange-700 text-white'
                        : 'text-orange-50 hover:bg-orange-600'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'block px-3 py-2 rounded-md text-base font-medium',
                pathname === item.href
                  ? 'bg-orange-700 text-white'
                  : 'text-orange-50 hover:bg-orange-600'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 