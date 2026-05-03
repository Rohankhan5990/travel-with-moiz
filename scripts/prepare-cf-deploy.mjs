/**
 * Cloudflare Workers static assets must be ≤ 25 MiB each.
 * After `next build`, drops bundled copies of review videos that are replaced
 * by NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL so `wrangler deploy` succeeds.
 */
import fs from "fs";
import path from "path";

/** Skip size check / pruning (local experiments only). Cloudflare deploy should not set this. */
if (process.env.SKIP_PREPARE_CF_DEPLOY === "1") {
  console.info("[prepare-cf-deploy] Skipped (SKIP_PREPARE_CF_DEPLOY=1).");
  process.exit(0);
}

const MAX_BYTES = 25 * 1024 * 1024;
const OUT_VIDEOS = path.join(process.cwd(), "out", "reviews-videos");

const REMOTE_BY_FILENAME = new Map([
  [
    "Kashmir Keran Tour..mp4",
    process.env.NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL?.trim(),
  ],
]);

function main() {
  if (!fs.existsSync(OUT_VIDEOS)) return;

  for (const file of fs.readdirSync(OUT_VIDEOS)) {
    if (!file.endsWith(".mp4") && !file.endsWith(".mov")) continue;
    const full = path.join(OUT_VIDEOS, file);
    const st = fs.statSync(full);
    if (st.size < MAX_BYTES) continue;

    const remote = REMOTE_BY_FILENAME.get(file);
    if (remote) {
      fs.unlinkSync(full);
      console.info(
        "[prepare-cf-deploy] Removed oversized %s from out/ (using remote URL).",
        file,
      );
      continue;
    }

    console.error(
      "\n[prepare-cf-deploy] Asset too large for Cloudflare Workers (max 25 MiB):",
      file,
      `(${Math.ceil(st.size / (1024 * 1024))} MiB)\n\n` +
        "Fix one of:\n" +
        "  • Set NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL to an https:// URL where this video is hosted (R2, Stream, etc.), then rebuild.\n" +
        "  • Re-encode locally to under 25 MiB, replace the file in public/reviews-videos/, and update lib/video-reviews.ts if the name changes.\n\n" +
        "Example (ffmpeg):\n" +
        `  ffmpeg -i "public/reviews-videos/${file}" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k "public/reviews-videos/kashmir-keran-tour-small.mp4"\n\n` +
        "Local-only: SKIP_PREPARE_CF_DEPLOY=1 npm run build (do not use for Cloudflare deploy).\n",
    );
    process.exit(1);
  }
}

main();
