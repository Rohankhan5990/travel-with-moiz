import { homepagePreloadImages } from "@/lib/optimized-image";

export function HomeResourceHints() {
  return (
    <>
      {homepagePreloadImages.map((href) => (
        <link key={href} rel="preload" as="image" href={href} fetchPriority="high" />
      ))}
    </>
  );
}
