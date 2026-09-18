"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { GALLERY_VIDEO, galleryPageContent } from "@/data/gallery";
import styles from "./GalleryHero.module.css";

export function GalleryHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { hero } = galleryPageContent;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || videoFailed) return;
    video.play().catch(() => setVideoFailed(true));
  }, [reducedMotion, videoFailed]);

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Paramount Club gallery introduction"
    >
      <div className={styles.media}>
        {showVideo ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={GALLERY_VIDEO.src}
            poster={GALLERY_VIDEO.poster}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <Image
            src={GALLERY_VIDEO.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.fallback}
          />
        )}
        <div className={styles.veil} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <span className={styles.rule} aria-hidden="true" />
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.actions}>
          <Button href="#gallery-collection" variant="primary">
            Browse Gallery
          </Button>
          <Button href="/availability" variant="secondary">
            Check Your Date
          </Button>
        </div>
      </div>
    </section>
  );
}
