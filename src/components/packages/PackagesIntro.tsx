import { Container } from "@/components/common/Container";
import { packagesPageContent } from "@/data/packages";
import styles from "./PackagesIntro.module.css";

export function PackagesIntro() {
  const { intro } = packagesPageContent;

  return (
    <section className={styles.section} aria-labelledby="packages-intro-heading">
      <Container className={styles.inner}>
        <p className={styles.eyebrow}>{intro.eyebrow}</p>
        <h2 id="packages-intro-heading" className={styles.heading}>
          {intro.heading}
        </h2>
        <p className={styles.body}>{intro.body}</p>
      </Container>
    </section>
  );
}
