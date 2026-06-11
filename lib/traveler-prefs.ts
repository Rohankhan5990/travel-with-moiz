"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lightweight localStorage-backed preferences (wishlist + recently viewed).
 * Components subscribe through a custom event so hearts stay in sync across
 * the page without a state library.
 */

const WISHLIST_KEY = "twm:wishlist";
const RECENT_KEY = "twm:recently-viewed";
const SYNC_EVENT = "twm:prefs-changed";
const RECENT_LIMIT = 6;

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  } catch {
    // Private mode / quota — wishlist silently becomes session-only.
  }
}

function useStoredList(key: string): string[] {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setList(readList(key));
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  return list;
}

export function useWishlist() {
  const slugs = useStoredList(WISHLIST_KEY);

  const toggle = useCallback((slug: string) => {
    const current = readList(WISHLIST_KEY);
    writeList(
      WISHLIST_KEY,
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }, []);

  return { slugs, toggle, has: (slug: string) => slugs.includes(slug) };
}

export function useRecentlyViewed() {
  return useStoredList(RECENT_KEY);
}

/** Record a tour visit (called from the tour detail page). */
export function recordTourVisit(slug: string) {
  const current = readList(RECENT_KEY).filter((s) => s !== slug);
  writeList(RECENT_KEY, [slug, ...current].slice(0, RECENT_LIMIT));
}
