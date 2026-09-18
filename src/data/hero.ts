/**
 * Homepage cinematic hero media sequence.
 * Video plays first; then images cycle with a zoom-out transition.
 */

export const HERO_VIDEO = {
  src: "/media/hero/mainvideo.mp4",
  poster: "/media/hero/main-2.png",
} as const;

export const HERO_IMAGES = [
  {
    id: "hero-img-1",
    src: "/media/hero/main-2.png",
    alt: "Paramount Club grand hall atmosphere",
  },
  {
    id: "hero-img-2",
    src: "/media/hero/main3.png",
    alt: "Paramount Club celebration setting",
  },
  {
    id: "hero-img-3",
    src: "/media/hero/main4.png",
    alt: "Paramount Club luxury venue interior",
  },
] as const;

/** Duration each still image remains on screen (ms). */
export const HERO_IMAGE_DURATION_MS = 7000;
