'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StoryList from './StoryList';
import { PAGE_SIZE, useStories, type Snapshot } from '@/hooks/useStories';
import type { StoryType } from '@/types/hackernews';

function Inner({ type, baseUrl, snapshot }: { type: StoryType; baseUrl: string; snapshot?: Snapshot }) {
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const { stories, totalPages, loading, error } = useStories(type, page, snapshot);

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

/** Client-rendered feed. useSearchParams needs a Suspense boundary for static export; the fallback shows the snapshot. */
export default function StoriesPage(props: { type: StoryType; baseUrl: string; snapshot?: Snapshot }) {
  const fb = props.snapshot && props.snapshot.stories.length ? props.snapshot : { stories: [], totalPages: 1 };
  return (
    <Suspense fallback={<StoryList stories={fb.stories} loading={fb.stories.length === 0} totalPages={fb.totalPages} currentPage={1} baseUrl={props.baseUrl} startRank={0} />}>
      <Inner {...props} />
    </Suspense>
  );
}
