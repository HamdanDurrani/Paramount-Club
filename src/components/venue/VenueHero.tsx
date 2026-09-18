"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { VENUE_VIDEO, venuePageContent } from "@/data/venue";
import styles from "./VenueHero.module.css";

export function VenueHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

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

  const { hero } = venuePageContent;
  const showVideo = !reducedMotion && !videoFailed;

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Paramount Club venue introduction"
    >
      <div className={styles.media}>
        {showVideo ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={VENUE_VIDEO.src}
            poster={VENUE_VIDEO.poster}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <Image
            src={VENUE_VIDEO.poster}
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
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
