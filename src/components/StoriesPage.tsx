'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StoryList from './StoryList';
import { useStories } from '@/hooks/useStories';
import type { StoryType } from '@/types/hackernews';

function Inner({ type, baseUrl }: { type: StoryType; baseUrl: string }) {
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const { stories, loading, error, totalPages } = useStories(type, page);

  if (error) {
    return (
      <div className="rounded-lg border border-[rgb(var(--border-rgb))] p-8 text-center text-sm text-gray-400">
        Could not reach Hacker News ({error}). <button className="underline" onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }
  return <StoryList stories={loading ? [] : stories} totalPages={totalPages} baseUrl={baseUrl} startRank={(page - 1) * 30} currentPage={page} />;
}

/** Client-rendered story list. useSearchParams needs a Suspense boundary for static export. */
export default function StoriesPage(props: { type: StoryType; baseUrl: string }) {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--accent-rgb))]" /></div>}>
      <Inner {...props} />
    </Suspense>
  );
}
