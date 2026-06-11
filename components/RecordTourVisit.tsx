"use client";

import { useEffect } from "react";
import { recordTourVisit } from "@/lib/traveler-prefs";

/** Invisible: logs the visited tour for the "Continue planning" rail. */
export function RecordTourVisit({ slug }: { slug: string }) {
  useEffect(() => {
    recordTourVisit(slug);
  }, [slug]);

  return null;
}
