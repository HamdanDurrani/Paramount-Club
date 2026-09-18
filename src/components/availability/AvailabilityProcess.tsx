import { Container } from "@/components/common/Container";
import { availabilityPageContent } from "@/data/availability";
import styles from "./AvailabilityProcess.module.css";

export function AvailabilityProcess() {
  const { process } = availabilityPageContent;

  return (
    <section className={styles.section} aria-labelledby="availability-process-heading">
      <Container wide>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{process.eyebrow}</p>
          <h2 id="availability-process-heading" className={styles.heading}>
            {process.heading}
          </h2>
        </header>

        <ol className={styles.steps}>
          {process.steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <p className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
