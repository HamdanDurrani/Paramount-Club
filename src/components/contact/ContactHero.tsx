import Image from "next/image";
import { contactPageContent } from "@/data/contact";
import styles from "./ContactHero.module.css";

const HERO_IMAGE = {
  src: "/media/venue/4.png",
  alt: "Paramount Club grand hall",
} as const;

export function ContactHero() {
  const { hero } = contactPageContent;

  return (
    <section
      className={styles.hero}
      data-hero
      aria-label="Contact Paramount Club"
    >
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
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
      </div>
    </section>
  );
}
