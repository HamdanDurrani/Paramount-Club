import Image from "next/image";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueAtmosphere.module.css";

export function VenueAtmosphere() {
  return (
    <section
      className={styles.section}
      aria-label={venuePageContent.atmosphere.caption}
    >
      <div className={styles.frame}>
        <Image
          src={VENUE_IMAGES.stage.src}
          alt={VENUE_IMAGES.stage.alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.veil} />
        <p className={styles.caption}>{venuePageContent.atmosphere.caption}</p>
      </div>
    </section>
  );
}
