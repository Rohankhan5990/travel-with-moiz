/**
 * Compresses large public images to WebP for faster first load.
 * Run automatically before `next build`, or manually: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

/** @type {{ dir: string; glob?: RegExp; maxWidth: number; quality: number }[]} */
const JOBS = [
  {
    dir: path.join(PUBLIC, "images", "card-images"),
    glob: /\.png$/i,
    maxWidth: 900,
    quality: 82,
  },
  {
    dir: path.join(PUBLIC, "images", "brand"),
    glob: /^hero-banner\.png$/i,
    maxWidth: 1920,
    quality: 85,
  },
  {
    dir: path.join(PUBLIC, "images", "pakistan-places-images"),
    glob: /\.(jpe?g|png)$/i,
    maxWidth: 960,
    quality: 82,
  },
];

async function optimizeFile(filePath, maxWidth, quality) {
  const ext = path.extname(filePath);
  const outPath = filePath.replace(new RegExp(`${ext}$`, "i"), ".webp");

  const inputStat = fs.statSync(filePath);
  const image = sharp(filePath).rotate();
  const meta = await image.metadata();

  const pipeline = image.resize({
    width: meta.width && meta.width > maxWidth ? maxWidth : undefined,
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality, effort: 4 }).toFile(outPath);

  const outStat = fs.statSync(outPath);
  const saved =
    inputStat.size > outStat.size
      ? `${(((inputStat.size - outStat.size) / inputStat.size) * 100).toFixed(0)}% smaller`
      : "webp variant";

  console.info(
    "  ✓ %s → %s (%s → %s, %s)",
    path.basename(filePath),
    path.basename(outPath),
    formatBytes(inputStat.size),
    formatBytes(outStat.size),
    saved,
  );

  return outPath;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function runJob({ dir, glob, maxWidth, quality }) {
  if (!fs.existsSync(dir)) {
    console.warn("[optimize-images] Skip missing dir: %s", dir);
    return;
  }

  const files = fs.readdirSync(dir).filter((name) => glob.test(name));
  if (files.length === 0) return;

  console.info("[optimize-images] %s (%d files)", path.relative(PUBLIC, dir), files.length);

  for (const name of files) {
    await optimizeFile(path.join(dir, name), maxWidth, quality);
  }
}

async function main() {
  console.info("[optimize-images] Generating WebP assets…");
  for (const job of JOBS) {
    await runJob(job);
  }
  console.info("[optimize-images] Done.");
}

main().catch((err) => {
  console.error("[optimize-images] Failed:", err);
  process.exit(1);
});
