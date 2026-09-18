import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { availabilityPageContent } from "@/data/availability";
import styles from "./AvailabilityCTA.module.css";

export function AvailabilityCTA() {
  const { cta } = availabilityPageContent;

  return (
    <section className={styles.section} aria-labelledby="availability-cta-heading">
      <Container className={styles.inner}>
        <h2 id="availability-cta-heading" className={styles.title}>
          {cta.title}
        </h2>
        <p className={styles.body}>{cta.body}</p>
        <div className={styles.actions}>
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
          <Button href="/packages" variant="secondary">
            View Packages
          </Button>
        </div>
      </Container>
    </section>
  );
}
