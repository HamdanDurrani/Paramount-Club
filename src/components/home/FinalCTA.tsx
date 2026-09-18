import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <Container>
        <div className={styles.inner}>
          <h2 id="final-cta-heading" className={styles.title}>
            <span>Your Celebration</span>
            <span>Deserves a</span>
            <span>Remarkable Setting.</span>
          </h2>
          <div className={styles.actions}>
            <Button href="/availability" variant="primary">
              Check Your Date
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
