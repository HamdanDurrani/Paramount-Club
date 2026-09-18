"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";
import { GalleryFilter } from "@/components/gallery/GalleryFilter";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryPageContent } from "@/data/gallery";
import type { GalleryCategory, GalleryItem } from "@/types";
import styles from "./GalleryGrid.module.css";

interface GalleryGridProps {
  items: GalleryItem[];
  categories: { id: GalleryCategory; label: string }[];
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { portfolio } = galleryPageContent;

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  const activeItem =
    activeIndex === null ? null : (filtered[activeIndex] ?? null);

  const openAt = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const goPrev = () => {
    if (activeIndex === null || filtered.length === 0) return;
    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
  };

  const goNext = () => {
    if (activeIndex === null || filtered.length === 0) return;
    setActiveIndex((activeIndex + 1) % filtered.length);
  };

  return (
    <section
      id="gallery-collection"
      className={styles.section}
      aria-labelledby="gallery-portfolio-heading"
    >
      <Container wide>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{portfolio.eyebrow}</p>
            <h2 id="gallery-portfolio-heading" className={styles.heading}>
              {portfolio.heading}
            </h2>
          </div>
          <GalleryFilter
            categories={categories}
            active={filter}
            onChange={setFilter}
          />
        </header>

        {filtered.length === 0 ? (
          <p className={styles.empty} role="status">
            No images in this category yet.
          </p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.item} ${
                  index % 5 === 0 ? styles.wide : ""
                } ${index % 7 === 3 ? styles.tall : ""}`}
                onClick={() => openAt(index)}
                aria-label={`Open ${item.title}`}
              >
                <span className={styles.media}>
                  <Image
                    src={item.src!}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={styles.image}
                  />
                </span>
                <span className={styles.meta}>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.category}>{item.category}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </Container>

      <Lightbox
        item={activeItem}
        onClose={close}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
}
