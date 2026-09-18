import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueSetups.module.css";

export function VenueSetups() {
  const { setups } = venuePageContent;

  return (
    <section className={styles.section} aria-labelledby="venue-setups-heading">
      <Container wide>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{setups.eyebrow}</p>
          <h2 id="venue-setups-heading" className={styles.heading}>
            {setups.heading}
          </h2>
        </header>

        <div className={styles.stack}>
          <article className={styles.block}>
            <figure className={styles.media}>
              <Image
                src={VENUE_IMAGES.setupFloral.src}
                alt={VENUE_IMAGES.setupFloral.alt}
                fill
                sizes="100vw"
                className={styles.image}
              />
            </figure>
            <div className={styles.copy}>
              <h3>{setups.floral.title}</h3>
              <p>{setups.floral.description}</p>
            </div>
          </article>

          <article className={`${styles.block} ${styles.blockReverse}`}>
            <figure className={styles.media}>
              <Image
                src={VENUE_IMAGES.setupDraped.src}
                alt={VENUE_IMAGES.setupDraped.alt}
                fill
                sizes="100vw"
                className={styles.image}
              />
            </figure>
            <div className={styles.copy}>
              <h3>{setups.draped.title}</h3>
              <p>{setups.draped.description}</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
