import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.copy}>
          The page you requested does not exist or may have been moved.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary">
            Return Home
          </Button>
          <Button href="/availability" variant="secondary">
            Check Your Date
          </Button>
        </div>
      </Container>
    </section>
  );
}
