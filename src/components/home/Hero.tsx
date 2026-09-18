"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CachedVideo } from "@/components/common/CachedVideo";
import {
  HERO_IMAGE_DURATION_MS,
  HERO_IMAGES,
  HERO_VIDEO,
} from "@/data/hero";
import styles from "./Hero.module.css";

const TOTAL_SLIDES = 1 + HERO_IMAGES.length;

const SLIDE_LABELS = [
  "Hall video",
  "Hall view 1",
  "Hall view 2",
  "Hall view 3",
] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [slide, setSlide] = useState(0); // 0 = video, 1..n = images
  const [progress, setProgress] = useState(0); // 0 → 1 for active slide
  const [zoomKey, setZoomKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      let target = next;
      if ((videoFailed || reducedMotion) && target === 0) {
        target = 1;
      }
      setSlide(target);
      setProgress(0);
      if (target > 0) setZoomKey((key) => key + 1);
    },
    [videoFailed, reducedMotion],
  );

  const advance = useCallback(() => {
    setSlide((current) => {
      let next = (current + 1) % TOTAL_SLIDES;
      if ((videoFailed || reducedMotion) && next === 0) {
        next = 1;
      }
      setProgress(0);
      if (next > 0) setZoomKey((key) => key + 1);
      return next;
    });
  }, [videoFailed, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || videoFailed) {
      goToSlide(1);
    }
  }, [reducedMotion, videoFailed, goToSlide]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (slide !== 0 || reducedMotion || videoFailed) {
      video.pause();
      return;
    }

    video.currentTime = 0;
    setProgress(0);

    const track = () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        rafRef.current = requestAnimationFrame(track);
        return;
      }
      setProgress(Math.min(1, video.currentTime / video.duration));
      rafRef.current = requestAnimationFrame(track);
    };

    const play = async () => {
      try {
        await video.play();
        rafRef.current = requestAnimationFrame(track);
      } catch {
        setVideoFailed(true);
      }
    };

    void play();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [slide, reducedMotion, videoFailed]);

  useEffect(() => {
    if (slide === 0) return;
    if (reducedMotion) {
      setProgress(1);
      const timer = window.setTimeout(advance, 4000);
      return () => window.clearTimeout(timer);
    }

    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - started) / HERO_IMAGE_DURATION_MS);
      setProgress(ratio);
      if (ratio >= 1) {
        advance();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [slide, reducedMotion, advance]);

  const onVideoEnded = () => {
    setProgress(1);
    advance();
  };

  return (
    <section
      data-hero
      className={styles.hero}
      aria-label="Paramount Club cinematic introduction"
    >
      <div className={styles.media} aria-hidden="true">
        <div
          className={`${styles.videoClip} ${
            slide === 0 && !videoFailed ? styles.layerActive : ""
          }`}
        >
          <CachedVideo
            ref={videoRef}
            className={styles.video}
            src={HERO_VIDEO.src}
            poster={HERO_VIDEO.poster}
            muted
            playsInline
            preload="auto"
            onEnded={onVideoEnded}
            onError={() => setVideoFailed(true)}
          />
        </div>

        {HERO_IMAGES.map((image, index) => {
          const slideIndex = index + 1;
          const isActive = slide === slideIndex;
          return (
            <div
              key={image.id}
              className={`${styles.layer} ${styles.imageLayer} ${
                isActive ? styles.layerActive : ""
              }`}
            >
              {isActive ? (
                <Image
                  key={`zoom-${zoomKey}-${image.id}`}
                  src={image.src}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`${styles.image} ${
                    !reducedMotion ? styles.imageZoom : ""
                  }`}
                />
              ) : (
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className={styles.image}
                />
              )}
            </div>
          );
        })}

        <div className={styles.veil} />
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Paramount Club · Peshawar</p>
          <span className={styles.rule} aria-hidden="true" />
          <h1 className={styles.title}>
            A venue of scale,
            <br />
            crafted for life&apos;s
            <br />
            defining moments.
          </h1>
        </div>

        <div
          className={styles.progress}
          role="tablist"
          aria-label="Hero media"
        >
          {Array.from({ length: TOTAL_SLIDES }, (_, index) => {
            const fill =
              index < slide ? 1 : index === slide ? progress : 0;
            const disabled = (videoFailed || reducedMotion) && index === 0;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                className={styles.progressTrack}
                aria-label={SLIDE_LABELS[index] ?? `Slide ${index + 1}`}
                aria-selected={slide === index}
                disabled={disabled}
                onClick={() => goToSlide(index)}
              >
                <span
                  className={styles.progressFill}
                  style={{ transform: `scaleX(${fill})` }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
