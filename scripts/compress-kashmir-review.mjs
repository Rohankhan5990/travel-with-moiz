/**
 * Creates public/reviews-videos/kashmir-keran-tour.mp4 (< 25 MiB for Cloudflare Workers)
 * from the full-quality master (default: Kashmir Keran Tour..mp4).
 *
 * Uses the `ffmpeg-static` npm binary when system ffmpeg is not installed.
 */
import { spawnSync } from "child_process";
import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);

function ffmpegPath() {
  try {
    const fromPkg = require("ffmpeg-static");
    if (typeof fromPkg === "string" && fromPkg) return fromPkg;
  } catch {
    /* package missing */
  }
  return "ffmpeg";
}

const DIR = path.join(process.cwd(), "public", "reviews-videos");
const SOURCE_DEFAULT = "Kashmir Keran Tour..mp4";
const OUTPUT = "kashmir-keran-tour.mp4";
const MAX_BYTES = 25 * 1024 * 1024;

const sourceName = process.argv[2] || SOURCE_DEFAULT;
const sourcePath = path.join(DIR, sourceName);
const outPath = path.join(DIR, OUTPUT);

if (!fs.existsSync(sourcePath)) {
  console.error(
    "Missing source video:\n  %s\nPlace your master file there or pass another filename as the first argument.",
    sourcePath,
  );
  process.exit(1);
}

const bin = ffmpegPath();
const ffmpeg = spawnSync(
  bin,
  [
    "-y",
    "-i",
    sourcePath,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-movflags",
    "+faststart",
    "-vf",
    "scale=min(1080\\,iw):-2",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    outPath,
  ],
  { stdio: "inherit" },
);

if (ffmpeg.error?.code === "ENOENT") {
  console.error(
    "ffmpeg not found. Run: npm install\nOr install system ffmpeg: brew install ffmpeg / sudo apt install ffmpeg",
  );
  process.exit(1);
}

if (ffmpeg.status !== 0) {
  process.exit(ffmpeg.status ?? 1);
}

const st = fs.statSync(outPath);
const mb = (st.size / (1024 * 1024)).toFixed(2);
if (st.size >= MAX_BYTES) {
  console.warn(
    "\nOutput is still %s MiB (Workers limit 25 MiB). Edit CRF to 30 in scripts/compress-kashmir-review.mjs or use NEXT_PUBLIC_REVIEW_VIDEO_KASHMIR_KERAN_URL.",
    mb,
  );
  process.exit(1);
}

console.info("\nDone: %s (%s MiB) — safe for Cloudflare Workers static assets.", outPath, mb);
