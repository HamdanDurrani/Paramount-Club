import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueEntrance.module.css";

export function VenueEntrance() {
  const { entrance } = venuePageContent;
  const [featured, ...rest] = VENUE_IMAGES.entrance;

  return (
    <section className={styles.section} aria-labelledby="venue-entrance-heading">
      <Container wide>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{entrance.eyebrow}</p>
          <h2 id="venue-entrance-heading" className={styles.heading}>
            {entrance.heading}
          </h2>
          <p className={styles.body}>{entrance.body}</p>
        </header>

        <div className={styles.mosaic}>
          <figure className={styles.featured}>
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width: 900px) 100vw, 62vw"
              className={styles.image}
              priority
            />
          </figure>

          <div className={styles.stack}>
            {rest.map((image) => (
              <figure key={image.src} className={styles.tile}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 38vw"
                  className={styles.image}
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
