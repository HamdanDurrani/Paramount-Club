import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { galleryPageContent } from "@/data/gallery";
import styles from "./GalleryCTA.module.css";

export function GalleryCTA() {
  const { cta } = galleryPageContent;

  return (
    <section className={styles.section} aria-labelledby="gallery-cta-heading">
      <Container className={styles.inner}>
        <h2 id="gallery-cta-heading" className={styles.title}>
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
