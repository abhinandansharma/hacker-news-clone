'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Masthead from './Masthead';
import StoryList from './StoryList';
import { PAGE_SIZE, useStories, type Snapshot } from '@/hooks/useStories';
import type { StoryType } from '@/types/hackernews';

function Inner({ type, baseUrl, snapshot }: { type: StoryType; baseUrl: string; snapshot?: Snapshot }) {
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const { stories, totalPages, loading, error, pending, applyPending } = useStories(type, page, snapshot);

  // Scroll to the top when the reader changes page or feed, never on first mount: the static page may already be
  // scrolled by the time hydration runs, and the browser restores position on back navigation.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) window.scrollTo({ top: 0 });
    mounted.current = true;
  }, [page, type]);

  return (
    <>
      <Masthead type={type} page={page} totalPages={totalPages} />
      {error ? (
        <div className="notice">
          <p>Could not reach Hacker News ({error}).</p>
          <button type="button" className="btn" onClick={() => location.reload()}>Try again</button>
        </div>
      ) : (
        <StoryList
          stories={stories} loading={loading} totalPages={totalPages} currentPage={page} baseUrl={baseUrl} startRank={(page - 1) * PAGE_SIZE}
          pendingCount={pending ? pending.filter((s) => !stories.some((c) => c.id === s.id)).length : 0}
          hasPending={!!pending} onApplyPending={applyPending}
        />
      )}
    </>
  );
}

/** Client-rendered feed. useSearchParams needs a Suspense boundary for static export; the fallback shows the snapshot. */
export default function StoriesPage(props: { type: StoryType; baseUrl: string; snapshot?: Snapshot }) {
  const fb = props.snapshot && props.snapshot.stories.length ? props.snapshot : { stories: [], totalPages: 1 };
  return (
    <Suspense fallback={<><Masthead type={props.type} page={1} totalPages={fb.totalPages} /><StoryList stories={fb.stories} loading={fb.stories.length === 0} totalPages={fb.totalPages} currentPage={1} baseUrl={props.baseUrl} startRank={0} /></>}>
      <Inner {...props} />
    </Suspense>
  );
}
