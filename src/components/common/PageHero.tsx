import { Container } from "@/components/common/Container";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  mediaLabel?: string;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  mediaLabel,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ""}`}>
      <div className={styles.media}>
        <MediaPlaceholder
          alt={title}
          label={mediaLabel ?? title}
          aspectRatio="auto"
          overlay="strong"
          className={styles.heroMedia}
          priority
        />
      </div>
      <Container wide className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </Container>
    </section>
  );
}
