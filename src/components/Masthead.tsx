import React from 'react';
import { FEEDS, type StoryType } from '@/types/hackernews';

/** The feed's name set large, with its page position in pixel numerals. */
export default function Masthead({ type, page, totalPages }: { type: StoryType; page: number; totalPages: number }) {
  const feed = FEEDS.find((f) => f.type === type)!;
  return (
    <div className="mast">
      <div>
        <h1 className="mast-title">{feed.title}</h1>
        <p className="mast-blurb">{feed.blurb}</p>
      </div>
      <p className="mast-page">
        <span className="mast-label">Page</span>
        <span className="num">{page}</span>
        <span className="mast-of">of</span>
        <span className="num">{totalPages}</span>
      </p>
    </div>
  );
}
