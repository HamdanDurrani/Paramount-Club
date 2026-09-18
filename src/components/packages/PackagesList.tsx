import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { packages } from "@/data/packages";
import styles from "./PackagesList.module.css";

export function PackagesList() {
  return (
    <section
      id="packages-list"
      className={styles.section}
      aria-label="Package directions"
    >
      <Container wide>
        <div className={styles.stack}>
          {packages.map((pkg, index) => (
            <article
              key={pkg.id}
              className={styles.package}
              aria-labelledby={`${pkg.id}-title`}
            >
              <div className={styles.top}>
                <div className={styles.identity}>
                  <p className={styles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className={styles.summary}>{pkg.summary}</p>
                  <h2 id={`${pkg.id}-title`}>{pkg.name}</h2>
                  <p className={styles.details}>{pkg.details}</p>
                </div>
                <p className={styles.price}>{pkg.priceLabel}</p>
              </div>

              <div className={styles.lists}>
                <div>
                  <p className={styles.listLabel}>What’s included</p>
                  <ul className={styles.features}>
                    {pkg.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={styles.listLabel}>What’s not included</p>
                  <ul className={`${styles.features} ${styles.excluded}`}>
                    {pkg.notIncluded.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.actions}>
                <Button href="/availability" variant="primary">
                  Check Your Date
                </Button>
                <Button href="/contact" variant="secondary">
                  Enquire
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
