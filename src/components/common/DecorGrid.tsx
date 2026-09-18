import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { decorOptions } from "@/data/decor";
import type { DecorOption } from "@/types";
import styles from "./DecorGrid.module.css";

type DecorGridProps = {
  selectable?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  options?: DecorOption[];
  showDiscussLater?: boolean;
  discussLaterSelected?: boolean;
  onDiscussLater?: () => void;
};

export function DecorGrid({
  selectable = false,
  selectedId,
  onSelect,
  options = decorOptions,
  showDiscussLater = false,
  discussLaterSelected = false,
  onDiscussLater,
}: DecorGridProps) {
  return (
    <div className={styles.grid}>
      {options.map((option) => {
        const selected = selectedId === option.id;
        const content = (
          <>
            <MediaPlaceholder
              src={option.src}
              alt={`${option.name} stage décor`}
              label={option.name.replace(/^\[|\]$/g, "")}
              aspectRatio={option.aspectRatio ?? "4 / 5"}
            />
            <div className={styles.body}>
              <h3 className={styles.title}>{option.name}</h3>
              <p className={styles.desc}>{option.description}</p>
              <p className={styles.path}>Drop image → {option.imagePath}</p>
            </div>
          </>
        );

        if (selectable) {
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.card} ${styles.selectable} ${selected ? styles.selected : ""}`}
              aria-pressed={selected}
              onClick={() => onSelect?.(option.id)}
            >
              {content}
            </button>
          );
        }

        return (
          <article key={option.id} className={styles.card}>
            {content}
          </article>
        );
      })}

      {showDiscussLater ? (
        <button
          type="button"
          className={`${styles.card} ${styles.selectable} ${styles.discuss} ${discussLaterSelected ? styles.selected : ""}`}
          aria-pressed={discussLaterSelected}
          onClick={onDiscussLater}
        >
          <div className={styles.discussInner}>
            <p className={styles.title}>Discuss later</p>
            <p className={styles.desc}>
              Prefer to decide décor with our team after the date enquiry.
            </p>
          </div>
        </button>
      ) : null}
    </div>
  );
}
