"use client";

import { useEffect } from "react";
import { GALLERY_VIDEO } from "@/data/gallery";
import { HERO_VIDEO } from "@/data/hero";
import { VENUE_VIDEO } from "@/data/venue";
import { prefetchSiteVideos } from "@/lib/videoCache";

/** Warms browser Cache Storage for hero videos during idle time. */
export function VideoCachePrefetch() {
  useEffect(() => {
    prefetchSiteVideos([
      HERO_VIDEO.src,
      VENUE_VIDEO.src,
      GALLERY_VIDEO.src,
    ]);
  }, []);

  return null;
}
