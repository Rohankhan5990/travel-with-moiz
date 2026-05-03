/**
 * Client video testimonials. Put `.mp4` files in `public/reviews-videos/`.
 * Kashmir uses `kashmir-keran-tour.mp4` (under 25 MiB for Cloudflare). Create it from your master with:
 *   npm run compress:kashmir-review
 * Or set NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL for a hosted full-quality URL.
 */
import { kashmirLocalBundled } from "@/lib/video-reviews.manifest";

export type VideoReview = {
  id: string;
  title: string;
  file?: string;
  remoteSrc?: string;
};

const KASHMIR_TITLE = "Kashmir · Keran tour — guest video";
/** Bundled file; generate with `npm run compress:kashmir-review` from your full-quality master. */
const KASHMIR_FILE = "kashmir-keran-tour.mp4";

const remote = process.env.NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL?.trim();

function kashmirEntries(): VideoReview[] {
  if (remote) {
    return [{ id: "kashmir-keran", title: KASHMIR_TITLE, remoteSrc: remote }];
  }
  if (process.env.NODE_ENV === "development") {
    return [{ id: "kashmir-keran", title: KASHMIR_TITLE, file: KASHMIR_FILE }];
  }
  if (kashmirLocalBundled) {
    return [{ id: "kashmir-keran", title: KASHMIR_TITLE, file: KASHMIR_FILE }];
  }
  return [];
}

export const videoReviews: VideoReview[] = [
  ...kashmirEntries(),
  {
    id: "naran",
    title: "Naran — traveler story",
    file: "naran.mp4",
  },
  {
    id: "swat",
    title: "Swat — where nature meets serenity",
    file: "SWAT – Where Nature Meets Serenity.mp4",
  },
];

export function videoReviewSrc(review: VideoReview): string {
  const r = review.remoteSrc?.trim();
  if (r) return r;
  if (!review.file) return "";
  return `/reviews-videos/${encodeURIComponent(review.file)}`;
}
