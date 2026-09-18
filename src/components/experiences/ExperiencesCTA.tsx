import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { experiencesPageContent } from "@/data/experiences";
import styles from "./ExperiencesCTA.module.css";

export function ExperiencesCTA() {
  const { cta } = experiencesPageContent;

  return (
    <section className={styles.section} aria-labelledby="experiences-cta-heading">
      <Container className={styles.inner}>
        <h2 id="experiences-cta-heading" className={styles.title}>
          {cta.title}
        </h2>
        <p className={styles.body}>{cta.body}</p>
        <div className={styles.actions}>
          <Button href="/availability" variant="primary">
            Check Your Date
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Container>
    </section>
  );
}
