"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/traveler-prefs";
import { cn } from "@/lib/utils";

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition active:scale-90",
        saved
          ? "bg-rose-500 text-white shadow-lg shadow-rose-950/30"
          : "bg-black/30 text-white hover:bg-black/45",
        className,
      )}
    >
      <Heart className={cn("h-4.5 w-4 transition sm:h-5 sm:w-5", saved && "fill-current")} strokeWidth={2} />
    </button>
  );
}
