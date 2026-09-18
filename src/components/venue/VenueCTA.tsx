import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { venuePageContent } from "@/data/venue";
import styles from "./VenueCTA.module.css";

export function VenueCTA() {
  const { cta } = venuePageContent;

  return (
    <section className={styles.section} aria-labelledby="venue-cta-heading">
      <Container className={styles.inner}>
        <h2 id="venue-cta-heading" className={styles.title}>
          {cta.title}
        </h2>
        <p className={styles.body}>{cta.body}</p>
        <div className={styles.actions}>
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
          <Button href="/gallery" variant="secondary">
            View Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
