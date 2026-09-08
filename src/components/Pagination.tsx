'use client';

import React from 'react';
import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, baseUrl }: { currentPage: number; totalPages: number; baseUrl: string }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => (p === 1 ? baseUrl : `${baseUrl}?page=${p}`);
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);
  return (
    <nav className="pager" aria-label="Pagination">
      <Link href={href(Math.max(1, currentPage - 1))} className="pager-btn" aria-disabled={currentPage === 1}>← Previous</Link>
      <div className="pager-pages">
        {pages.map((p) => (
          <Link key={p} href={href(p)} className={p === currentPage ? 'on' : ''} aria-current={p === currentPage ? 'page' : undefined}>{p}</Link>
        ))}
        {pages[pages.length - 1] < totalPages && <Link href={href(totalPages)}>… {totalPages}</Link>}
      </div>
      <Link href={href(Math.min(totalPages, currentPage + 1))} className="pager-btn" aria-disabled={currentPage === totalPages}>Next →</Link>
    </nav>
  );
}
