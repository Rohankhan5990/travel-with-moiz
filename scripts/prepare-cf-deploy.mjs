/**
 * Cloudflare Workers static assets must be ≤ 25 MiB each.
 * After `next build`, removes any review video in out/ that still exceeds the limit
 * (e.g. if it was copied from public/). Does not fail the build.
 */
import fs from "fs";
import path from "path";

if (process.env.SKIP_PREPARE_CF_DEPLOY === "1") {
  console.info("[prepare-cf-deploy] Skipped (SKIP_PREPARE_CF_DEPLOY=1).");
  process.exit(0);
}

const MAX_BYTES = 25 * 1024 * 1024;
const OUT_VIDEOS = path.join(process.cwd(), "out", "reviews-videos");

function main() {
  if (!fs.existsSync(OUT_VIDEOS)) return;

  for (const file of fs.readdirSync(OUT_VIDEOS)) {
    if (!file.endsWith(".mp4") && !file.endsWith(".mov")) continue;
    const full = path.join(OUT_VIDEOS, file);
    const st = fs.statSync(full);
    if (st.size < MAX_BYTES) continue;

    fs.unlinkSync(full);
    console.warn(
      "[prepare-cf-deploy] Removed %s (%s MiB) from out/ — over Cloudflare Workers 25 MiB per-file limit. Use a smaller encode in public/reviews-videos/ or host the file elsewhere (NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL for Kashmir).",
      file,
      Math.ceil(st.size / (1024 * 1024)),
    );
  }
}

main();
