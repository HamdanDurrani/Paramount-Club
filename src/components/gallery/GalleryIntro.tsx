import { Container } from "@/components/common/Container";
import { galleryPageContent } from "@/data/gallery";
import styles from "./GalleryIntro.module.css";

export function GalleryIntro() {
  const { intro } = galleryPageContent;

  return (
    <section className={styles.section} aria-labelledby="gallery-intro-heading">
      <Container className={styles.inner}>
        <p className={styles.eyebrow}>{intro.eyebrow}</p>
        <h2 id="gallery-intro-heading" className={styles.heading}>
          {intro.heading}
        </h2>
        <p className={styles.body}>{intro.body}</p>
      </Container>
    </section>
  );
}
