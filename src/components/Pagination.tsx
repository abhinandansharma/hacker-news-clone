'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <nav className="flex items-center justify-center mt-32 mb-16" aria-label="Pagination">
      <div className="flex items-center gap-x-16">
        {currentPage > 1 && (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-3 py-1.5 text-sm font-medium text-[rgb(var(--accent-rgb))] bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-rgb))] rounded-md hover:bg-[rgb(var(--border-rgb))] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--accent-rgb))] shadow-sm"
          >
            Previous
          </Link>
        )}

        <div className="flex items-center gap-x-4">
          {visiblePages[0] > 1 && (
            <>
              <Link
                href={`${baseUrl}?page=1`}
                className="px-3 py-1.5 text-sm font-medium text-[rgb(var(--accent-rgb))] bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-rgb))] rounded-md hover:bg-[rgb(var(--border-rgb))] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--accent-rgb))] shadow-sm"
              >
                1
              </Link>
              {visiblePages[0] > 2 && (
                <span className="px-3 py-1.5 text-sm font-medium text-gray-400">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <Link
              key={page}
              href={`${baseUrl}?page=${page}`}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--accent-rgb))] shadow-sm ${
                page === currentPage
                  ? 'bg-[rgb(var(--accent-rgb))] text-white border border-[rgb(var(--accent-rgb))] hover:bg-opacity-90'
                  : 'text-[rgb(var(--accent-rgb))] bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-rgb))] hover:bg-[rgb(var(--border-rgb))]'
              }`}
            >
              {page}
            </Link>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-3 py-1.5 text-sm font-medium text-gray-400">...</span>
              )}
              <Link
                href={`${baseUrl}?page=${totalPages}`}
                className="px-3 py-1.5 text-sm font-medium text-[rgb(var(--accent-rgb))] bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-rgb))] rounded-md hover:bg-[rgb(var(--border-rgb))] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--accent-rgb))] shadow-sm"
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>

        {currentPage < totalPages && (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-3 py-1.5 text-sm font-medium text-[rgb(var(--accent-rgb))] bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-rgb))] rounded-md hover:bg-[rgb(var(--border-rgb))] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--accent-rgb))] shadow-sm"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
} 