/**
 * Client video testimonials. Put `.mp4` files in `public/reviews-videos/`
 * and set `file` to the filename. For files over Cloudflare Workers’ 25 MiB
 * per-asset limit, host the video elsewhere and set `remoteSrc` (see Kashmir).
 */
export type VideoReview = {
  id: string;
  title: string;
  /** Local file in public/reviews-videos/ */
  file?: string;
  /** Full https:// URL — overrides `file` when set (required for oversized clips on Workers) */
  remoteSrc?: string;
};

export const videoReviews: VideoReview[] = [
  {
    id: "kashmir-keran",
    title: "Kashmir · Keran tour — guest video",
    file: "Kashmir Keran Tour..mp4",
    remoteSrc: process.env.NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL,
  },
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
  const remote = review.remoteSrc?.trim();
  if (remote) return remote;
  if (!review.file) return "";
  return `/reviews-videos/${encodeURIComponent(review.file)}`;
}
