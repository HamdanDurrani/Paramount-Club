/**
 * Browser Cache Storage for large media (videos).
 * First visit streams from network and warms the cache;
 * later visits can play from a local blob URL for faster start.
 */

const CACHE_NAME = "paramount-media-v1";

function toAbsoluteUrl(src: string): string {
  if (typeof window === "undefined") return src;
  return new URL(src, window.location.origin).href;
}

export async function getCachedVideoSrc(src: string): Promise<{
  src: string;
  fromCache: boolean;
  revoke?: () => void;
}> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return { src, fromCache: false };
  }

  const absolute = toAbsoluteUrl(src);

  try {
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(absolute);

    if (hit) {
      const blob = await hit.blob();
      const objectUrl = URL.createObjectURL(blob);
      return {
        src: objectUrl,
        fromCache: true,
        revoke: () => URL.revokeObjectURL(objectUrl),
      };
    }

    // Warm cache without blocking first paint / first play.
    void warmVideoCache(absolute, cache);
    return { src, fromCache: false };
  } catch {
    return { src, fromCache: false };
  }
}

async function warmVideoCache(absolute: string, cache: Cache) {
  try {
    const response = await fetch(absolute, {
      mode: "same-origin",
      credentials: "same-origin",
      cache: "force-cache",
    });
    if (response.ok) {
      await cache.put(absolute, response);
    }
  } catch {
    // Ignore — network play still works.
  }
}

/** Prefetch key hero videos during idle time (homepage). */
export function prefetchSiteVideos(paths: string[]) {
  if (typeof window === "undefined" || !("caches" in window)) return;

  const run = () => {
    void (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await Promise.all(
          paths.map((path) => warmVideoCache(toAbsoluteUrl(path), cache)),
        );
      } catch {
        // no-op
      }
    })();
  };

  window.setTimeout(run, 1800);
}
