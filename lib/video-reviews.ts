/**
 * Client video testimonials. Put `.mp4` files in `public/reviews-videos/`
 * and set `file` to the filename (including `.mp4`). These URLs feed the
 * cards in `ClientReviewsSection`.
 */
export type VideoReview = {
  id: string;
  title: string;
  /** Filename inside public/reviews-videos/, e.g. "hunza-review.mp4" */
  file: string;
};

export const videoReviews: VideoReview[] = [
  {
    id: "kashmir-keran",
    title: "Kashmir · Keran tour — guest video",
    file: "Kashmir Keran Tour..mp4",
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

export function videoReviewSrc(review: VideoReview) {
  return `/reviews-videos/${encodeURIComponent(review.file)}`;
}
