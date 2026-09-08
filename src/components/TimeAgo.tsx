'use client';

import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

/** Relative time, computed only in the browser so a build-time snapshot never disagrees with the client clock. */
export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp * 1000);
  const [text, setText] = useState('');
  useEffect(() => { setText(formatDistanceToNowStrict(date, { addSuffix: true })); }, [timestamp]); // eslint-disable-line react-hooks/exhaustive-deps
  return <time dateTime={date.toISOString()} suppressHydrationWarning>{text}</time>;
}
