"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { SectionHeading } from "@/components/common/SectionHeading";
import { galleryPreviewItems, homeGalleryFilters } from "@/data/gallery";
import styles from "./GalleryPreview.module.css";

type FilterId = (typeof homeGalleryFilters)[number]["id"];

export function GalleryPreview() {
  const [filter, setFilter] = useState<FilterId>("all");

  const items = useMemo(() => {
    if (filter === "all") return galleryPreviewItems;
    return galleryPreviewItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section id="gallery-preview" className={styles.section} aria-labelledby="gallery-preview-heading">
      <Container wide>
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Gallery"
            title={<span id="gallery-preview-heading">Moments in Frame</span>}
            subtitle="A glimpse of celebrations, stage, and atmosphere at Paramount Club."
          />
          <Link href="/gallery" className={styles.viewAll}>
            View Full Gallery
          </Link>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Gallery categories">
          {homeGalleryFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={`${styles.filter} ${filter === item.id ? styles.active : ""}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>No gallery items in this category yet.</p>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.item} ${index % 5 === 0 ? styles.wide : ""}`}
              >
                <MediaPlaceholder
                  alt={item.alt}
                  label={item.title}
                  src={item.src}
                  aspectRatio={item.aspectRatio ?? "4 / 5"}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
