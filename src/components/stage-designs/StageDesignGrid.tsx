"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type {
  StageDesignCategoryId,
  StageDesignItem,
} from "@/data/stageDesigns";
import styles from "./StageDesignGrid.module.css";

interface StageDesignGridProps {
  items: StageDesignItem[];
  categories: { id: StageDesignCategoryId; label: string }[];
}

export function StageDesignGrid({ items, categories }: StageDesignGridProps) {
  const [filter, setFilter] = useState<StageDesignCategoryId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Filter stage designs">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={filter === category.id}
            className={`${styles.filter} ${
              filter === category.id ? styles.active : ""
            }`}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty} role="status">
          No stage designs in this category yet.
        </p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <article key={item.id} className={styles.card}>
              <figure className={styles.media}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.image}
                />
              </figure>
              <div className={styles.copy}>
                <p className={styles.category}>
                  {categories.find((c) => c.id === item.category)?.label}
                </p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
