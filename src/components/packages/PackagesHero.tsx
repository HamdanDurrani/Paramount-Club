import Image from "next/image";
import { Button } from "@/components/common/Button";
import { PACKAGES_HERO, packagesPageContent } from "@/data/packages";
import styles from "./PackagesHero.module.css";

export function PackagesHero() {
  const { hero } = packagesPageContent;

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Paramount Club packages introduction"
    >
      <div className={styles.media}>
        <Image
          src={PACKAGES_HERO.src}
          alt={PACKAGES_HERO.alt}
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
          <Button href="#packages-list" variant="primary">
            View Packages
          </Button>
          <Button href="/availability" variant="secondary">
            Check Your Date
          </Button>
        </div>
      </div>
    </section>
  );
}
