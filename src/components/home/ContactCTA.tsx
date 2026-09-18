import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Container } from "@/components/common/Container";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  return (
    <section className={styles.section} aria-labelledby="contact-cta-heading">
      <Container>
        <div className={styles.inner}>
          <div className={styles.mark} aria-hidden="true">
            <BrandLogo size="nav" />
          </div>
          <h2 id="contact-cta-heading" className={styles.title}>
            Ready to learn more?
          </h2>
          <p className={styles.copy}>
            Contact us for availability, packages or additional information. We
            will work with you to create a truly memorable experience.
          </p>
          <Link href="/contact" className={styles.button}>
            <span>Get in Touch</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
