import { Container } from "@/components/common/Container";
import { venuePageContent, venueStats } from "@/data/venue";
import styles from "./VenueCapacity.module.css";

export function VenueCapacity() {
  const { capacity } = venuePageContent;

  return (
    <section className={styles.section} aria-labelledby="venue-capacity-heading">
      <Container wide className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{capacity.eyebrow}</p>
          <h2 id="venue-capacity-heading" className={styles.heading}>
            {capacity.heading}
          </h2>
          <p className={styles.body}>{capacity.body}</p>
        </div>

        <ul className={styles.stats}>
          {venueStats.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
