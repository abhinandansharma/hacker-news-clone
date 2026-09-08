import StoriesPage from '@/components/StoriesPage';
import { buildSnapshot } from '@/lib/snapshot';

/** Rendered at build time with the feed as it was then; the browser refreshes it immediately after hydration. */
export default async function Page() {
  const snapshot = await buildSnapshot('ask');
  return <StoriesPage type="ask" baseUrl="/ask/" snapshot={snapshot} />;
}
