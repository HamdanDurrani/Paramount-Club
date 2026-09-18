import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Stat } from "@/components/common/Stat";
import { venueIntro, venueStats } from "@/data/venue";
import styles from "./VenueIntro.module.css";

export function VenueIntro() {
  return (
    <section id="venue-intro" className={styles.section} aria-labelledby="venue-intro-heading">
      <Container wide className={styles.grid}>
        <SectionHeading
          eyebrow={venueIntro.eyebrow}
          title={
            <span id="venue-intro-heading" className={styles.titleStack}>
              {venueIntro.headingLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          }
          as="h2"
        />
        <div className={styles.copy}>
          <p>{venueIntro.body}</p>
          <div className={styles.stats}>
            {venueStats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
