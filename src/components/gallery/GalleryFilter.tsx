"use client";

import styles from "./GalleryFilter.module.css";
import type { GalleryCategory } from "@/types";

interface GalleryFilterProps {
  categories: { id: GalleryCategory; label: string }[];
  active: GalleryCategory;
  onChange: (id: GalleryCategory) => void;
}

export function GalleryFilter({
  categories,
  active,
  onChange,
}: GalleryFilterProps) {
  return (
    <div className={styles.filters} role="tablist" aria-label="Filter gallery">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={active === category.id}
          className={`${styles.filter} ${active === category.id ? styles.active : ""}`}
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
