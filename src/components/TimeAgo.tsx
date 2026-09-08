'use client';

import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp * 1000);
  return <time dateTime={date.toISOString()} title={date.toLocaleString()}>{formatDistanceToNowStrict(date, { addSuffix: true })}</time>;
}
