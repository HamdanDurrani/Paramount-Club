import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { packagesPageContent } from "@/data/packages";
import styles from "./PackagesCTA.module.css";

export function PackagesCTA() {
  const { cta } = packagesPageContent;

  return (
    <section className={styles.section} aria-labelledby="packages-cta-heading">
      <Container className={styles.inner}>
        <h2 id="packages-cta-heading" className={styles.title}>
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
