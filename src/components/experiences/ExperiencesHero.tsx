import Image from "next/image";
import { Button } from "@/components/common/Button";
import {
  EXPERIENCES_HERO,
  experiencesPageContent,
} from "@/data/experiences";
import styles from "./ExperiencesHero.module.css";

export function ExperiencesHero() {
  const { hero } = experiencesPageContent;

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Paramount Club experiences introduction"
    >
      <div className={styles.media}>
        <Image
          src={EXPERIENCES_HERO.src}
          alt={EXPERIENCES_HERO.alt}
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.veil} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <span className={styles.rule} aria-hidden="true" />
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.actions}>
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
