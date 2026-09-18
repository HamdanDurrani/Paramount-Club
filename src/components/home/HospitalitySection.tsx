import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { hospitalityThemes } from "@/data/venue";
import styles from "./HospitalitySection.module.css";

export function HospitalitySection() {
  return (
    <section className={styles.section} aria-labelledby="hospitality-heading">
      <Container wide>
        <SectionHeading
          eyebrow="Experience"
          title={<span id="hospitality-heading">Hospitality at Scale</span>}
          subtitle="An atmosphere shaped by grandeur, coordination, and attentive hosting."
          className={styles.heading}
        />
        <div className={styles.grid}>
          {hospitalityThemes.map((theme, index) => (
            <article
              key={theme.id}
              className={`${styles.item} ${index % 2 === 1 ? styles.offset : ""}`}
            >
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
