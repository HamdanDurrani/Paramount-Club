import Link from "next/link";
import { Container } from "@/components/common/Container";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { SectionHeading } from "@/components/common/SectionHeading";
import { experiences } from "@/data/experiences";
import styles from "./ExperiencesPreview.module.css";

export function ExperiencesPreview() {
  return (
    <section className={styles.section} aria-labelledby="experiences-heading">
      <Container wide>
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Experiences"
            title={<span id="experiences-heading">Celebrations of Distinction</span>}
            subtitle="Weddings, Mehndi, Walima, and private occasions — hosted with scale and restraint."
          />
          <Link href="/experiences" className={styles.viewAll}>
            View All Experiences
          </Link>
        </div>

        <div className={styles.grid}>
          {experiences.map((experience) => (
            <Link
              key={experience.id}
              href={experience.href}
              className={styles.card}
            >
              <MediaPlaceholder
                kind={experience.media.kind}
                src={experience.media.src}
                alt={experience.media.alt}
                label={experience.media.label}
                aspectRatio={experience.media.aspectRatio}
                overlay
                className={styles.media}
              />
              <div className={styles.meta}>
                <h3>{experience.title}</h3>
                <p>{experience.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
