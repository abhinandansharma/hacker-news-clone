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
    <nav className="flex items-center justify-center mt-12 mb-8" aria-label="Pagination">
      <div className="flex items-center gap-x-12">
        {currentPage > 1 && (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          >
            Previous
          </Link>
        )}

        <div className="flex items-center gap-x-6">
          {visiblePages[0] > 1 && (
            <>
              <Link
                href={`${baseUrl}?page=1`}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                1
              </Link>
              {visiblePages[0] > 2 && (
                <span className="px-4 py-2 text-sm font-medium text-gray-900">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <Link
              key={page}
              href={`${baseUrl}?page=${page}`}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm ${
                page === currentPage
                  ? 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                  : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              {page}
            </Link>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-4 py-2 text-sm font-medium text-gray-900">...</span>
              )}
              <Link
                href={`${baseUrl}?page=${totalPages}`}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>

        {currentPage < totalPages && (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
} 