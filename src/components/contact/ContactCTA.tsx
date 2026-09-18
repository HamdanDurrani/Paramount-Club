import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { contactPageContent } from "@/data/contact";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  const { cta } = contactPageContent;

  return (
    <section className={styles.section} aria-labelledby="contact-cta-heading">
      <Container className={styles.inner}>
        <h2 id="contact-cta-heading" className={styles.title}>
          {cta.title}
        </h2>
        <p className={styles.body}>{cta.body}</p>
        <div className={styles.actions}>
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
          <Button href="/packages" variant="secondary">
            View Packages
          </Button>
        </div>
      </Container>
    </section>
  );
}
