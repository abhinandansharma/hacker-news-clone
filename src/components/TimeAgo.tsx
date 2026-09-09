'use client';

import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

const label = (date: Date) => formatDistanceToNowStrict(date, { addSuffix: true });

/**
 * Relative time. The static HTML carries the value as of the build so the row has its final width on first paint;
 * the browser then replaces it with the value for its own clock, and keeps it fresh every minute.
 */
export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp * 1000);
  const [text, setText] = useState(() => label(date));
  useEffect(() => {
    const tick = () => setText(label(new Date(timestamp * 1000)));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [timestamp]);
  return <time dateTime={date.toISOString()} suppressHydrationWarning>{text}</time>;
}
