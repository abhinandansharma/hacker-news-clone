'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const norm = (p: string) => (p.replace(/\/+$/, '') || '/');

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = norm(pathname) === norm(href);
  return (
    <Link href={href} className={`tab ${active ? 'on' : ''}`} aria-current={active ? 'page' : undefined}>
      {children}
    </Link>
  );
}
