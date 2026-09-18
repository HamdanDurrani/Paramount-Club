import Image from "next/image";
import { VENUE_IMAGES, venuePageContent } from "@/data/venue";
import styles from "./VenueDanceFloor.module.css";

export function VenueDanceFloor() {
  return (
    <section
      className={styles.section}
      aria-label={venuePageContent.danceFloor.caption}
    >
      <div className={styles.frame}>
        <Image
          src={VENUE_IMAGES.danceFloor.src}
          alt={VENUE_IMAGES.danceFloor.alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.veil} />
        <p className={styles.caption}>{venuePageContent.danceFloor.caption}</p>
      </div>
    </section>
  );
}
