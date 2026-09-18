import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import styles from "./AvailabilityCTA.module.css";

export function AvailabilityCTA() {
  return (
    <section id="plan" className={styles.section} aria-labelledby="plan-heading">
      <Container>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>Availability</p>
          <h2 id="plan-heading" className={styles.title}>
            Plan Your Event
          </h2>
          <p className={styles.copy}>
            Find out if your preferred date is available.
          </p>
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
        </div>
      </Container>
    </section>
  );
}
