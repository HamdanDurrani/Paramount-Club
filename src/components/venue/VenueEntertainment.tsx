import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueEntertainment.module.css";

export function VenueEntertainment() {
  const { entertainment } = venuePageContent;

  return (
    <section
      className={styles.section}
      aria-labelledby="venue-entertainment-heading"
    >
      <Container wide>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{entertainment.eyebrow}</p>
          <h2 id="venue-entertainment-heading" className={styles.heading}>
            {entertainment.heading}
          </h2>
          <p className={styles.lead}>{entertainment.body}</p>
        </header>

        <div className={styles.grid}>
          <article className={styles.feature}>
            <figure className={styles.media}>
              <Image
                src={VENUE_IMAGES.dj.src}
                alt={VENUE_IMAGES.dj.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
              />
            </figure>
            <div className={styles.copy}>
              <h3>{entertainment.dj.title}</h3>
              <p>{entertainment.dj.description}</p>
            </div>
          </article>

          <article className={styles.feature}>
            <figure className={`${styles.media} ${styles.mediaTall}`}>
              <Image
                src={VENUE_IMAGES.celebrity.src}
                alt={VENUE_IMAGES.celebrity.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
              />
            </figure>
            <div className={styles.copy}>
              <h3>{entertainment.celebrity.title}</h3>
              <p>{entertainment.celebrity.description}</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
