import Image from "next/image";
import styles from "./MediaPlaceholder.module.css";

interface MediaPlaceholderProps {
  kind?: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  overlay?: boolean | "strong";
  className?: string;
  priority?: boolean;
  /** Prefer static image on mobile for video heroes */
  mobileFallback?: string;
}

export function MediaPlaceholder({
  kind = "image",
  src,
  poster,
  alt,
  label,
  aspectRatio = "16 / 9",
  overlay = false,
  className = "",
  priority = false,
  mobileFallback,
}: MediaPlaceholderProps) {
  const hasMedia = Boolean(src);

  return (
    <div
      className={`${styles.placeholder} ${className}`.trim()}
      style={aspectRatio === "auto" ? undefined : { aspectRatio }}
      role="img"
      aria-label={alt}
    >
      {hasMedia && kind === "image" ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className={styles.media}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      ) : null}

      {hasMedia && kind === "video" ? (
        <>
          {mobileFallback ? (
            <Image
              src={mobileFallback}
              alt={alt}
              fill
              sizes="100vw"
              className={`${styles.media} ${styles.mobileOnly}`}
              priority={priority}
              style={{ objectFit: "cover" }}
            />
          ) : null}
          <video
            className={`${styles.media} ${mobileFallback ? styles.desktopVideo : ""}`}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            aria-label={alt}
          >
            <source src={src} type="video/mp4" />
          </video>
        </>
      ) : null}

      {!hasMedia ? (
        <div className={styles.fallback}>
          <div>
            <p className={styles.label}>{label ?? "Media Placeholder"}</p>
            <p className={styles.meta}>Replace with venue media</p>
          </div>
        </div>
      ) : null}

      {overlay ? (
        <div
          className={`${styles.overlay} ${overlay === "strong" ? styles.overlayStrong : ""}`}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
