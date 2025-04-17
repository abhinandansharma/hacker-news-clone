'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
  timestamp: number;
}

export default function TimeAgo({ timestamp }: TimeAgoProps) {
  const date = new Date(timestamp * 1000);
  return (
    <span className="text-gray-700">
      {formatDistanceToNow(date, { addSuffix: true })}
    </span>
  );
} 