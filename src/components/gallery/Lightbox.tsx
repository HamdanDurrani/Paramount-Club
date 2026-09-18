"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryItem } from "@/types";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (!item) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close image viewer"
        >
          Close
        </button>
        <div className={styles.media}>
          <Image
            src={item.src!}
            alt={item.alt}
            fill
            sizes="90vw"
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.meta}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.category}>{item.category}</p>
        </div>
        <div className={styles.nav}>
          <button type="button" onClick={onPrev} aria-label="Previous image">
            Previous
          </button>
          <button type="button" onClick={onNext} aria-label="Next image">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
