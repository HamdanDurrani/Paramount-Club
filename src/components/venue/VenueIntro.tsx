import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueIntro.module.css";

export function VenueIntro() {
  const { intro } = venuePageContent;

  return (
    <section className={styles.section} aria-labelledby="venue-intro-heading">
      <Container wide className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{intro.eyebrow}</p>
          <h2 id="venue-intro-heading" className={styles.heading}>
            {intro.heading}
          </h2>
          <div className={styles.body}>
            {intro.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <figure className={styles.media}>
          <Image
            src={VENUE_IMAGES.hall.src}
            alt={VENUE_IMAGES.hall.alt}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.image}
            priority
          />
        </figure>
      </Container>
    </section>
  );
}
