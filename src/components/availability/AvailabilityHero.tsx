"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { availabilityPageContent } from "@/data/availability";
import {
  AVAILABILITY_HERO_DURATION_MS,
  AVAILABILITY_HERO_IMAGES,
} from "@/data/availabilityHero";
import styles from "./AvailabilityHero.module.css";

export function AvailabilityHero() {
  const { hero } = availabilityPageContent;
  const [slide, setSlide] = useState(0);
  const [zoomKey, setZoomKey] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goTo = useCallback((index: number) => {
    setSlide(index);
    setZoomKey((key) => key + 1);
    setCycleKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setSlide((current) => {
        const next = (current + 1) % AVAILABILITY_HERO_IMAGES.length;
        setZoomKey((key) => key + 1);
        return next;
      });
    }, AVAILABILITY_HERO_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, cycleKey]);

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Check your date at Paramount Club"
    >
      <div className={styles.media}>
        {AVAILABILITY_HERO_IMAGES.map((image, index) => {
          const active = index === slide;
          return (
            <div
              key={image.id}
              className={`${styles.layer} ${active ? styles.layerActive : ""}`}
              aria-hidden={!active}
            >
              <Image
                key={active ? `${image.id}-${zoomKey}` : image.id}
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`${styles.image} ${
                  active && !reducedMotion ? styles.imageZoom : ""
                } ${index % 2 === 1 ? styles.imageZoomAlt : ""}`}
              />
            </div>
          );
        })}
        <div className={styles.veil} />
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <span className={styles.rule} aria-hidden="true" />
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.actions}>
            <Button href="#date-request" variant="primary">
              Begin Date Request
            </Button>
            <Button href="/contact" variant="secondary">
              Speak With Us
            </Button>
          </div>
        </div>

        <div
          className={styles.progress}
          role="tablist"
          aria-label="Hero images"
        >
          {AVAILABILITY_HERO_IMAGES.map((image, index) => (
            <button
              key={image.id}
              type="button"
              role="tab"
              aria-selected={index === slide}
              aria-label={`Show image ${index + 1}`}
              className={`${styles.dot} ${index === slide ? styles.dotActive : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
