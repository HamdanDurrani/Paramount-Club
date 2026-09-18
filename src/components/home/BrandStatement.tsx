import { Container } from "@/components/common/Container";
import styles from "./BrandStatement.module.css";

export function BrandStatement() {
  return (
    <section className={styles.section} aria-labelledby="brand-statement-heading">
      <Container className={styles.inner}>
        <p className={styles.eyebrow} id="brand-statement-heading">
          Where Moments Become Memories
        </p>
        <div className={styles.copy}>
          <p>
            At Paramount Club, we&apos;ve created more than a venue we&apos;ve
            created a setting where celebrations feel extraordinary. From grand
            weddings and timeless traditions to intimate gatherings and
            unforgettable occasions, every detail is designed to make your
            moments truly yours.
          </p>
          <p>
            Set in the heart of Peshawar, Paramount Club brings together refined
            spaces, modern elegance and exceptional hospitality. Here, timeless
            celebrations meet contemporary luxury creating an experience worth
            remembering long after the last guest leaves.
          </p>
        </div>
      </Container>
    </section>
  );
}
