'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StoryList from './StoryList';
import { PAGE_SIZE, useStories } from '@/hooks/useStories';
import type { StoryType } from '@/types/hackernews';

function Inner({ type, baseUrl }: { type: StoryType; baseUrl: string }) {
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const { stories, totalPages, loading, error } = useStories(type, page);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [page, type]);

  if (error) {
    return (
      <div className="list empty">
        Could not reach Hacker News ({error}). <button onClick={() => location.reload()}>Try again</button>
      </div>
    );
  }
  return <StoryList stories={stories} loading={loading} totalPages={totalPages} currentPage={page} baseUrl={baseUrl} startRank={(page - 1) * PAGE_SIZE} />;
}

/** Client-rendered feed. useSearchParams needs a Suspense boundary for static export. */
export default function StoriesPage(props: { type: StoryType; baseUrl: string }) {
  return (
    <Suspense fallback={<StoryList stories={[]} loading totalPages={1} currentPage={1} baseUrl={props.baseUrl} startRank={0} />}>
      <Inner {...props} />
    </Suspense>
  );
}
