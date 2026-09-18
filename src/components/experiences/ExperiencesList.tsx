import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { experiences } from "@/data/experiences";
import styles from "./ExperiencesList.module.css";

export function ExperiencesList() {
  return (
    <div className={styles.list}>
      {experiences.map((experience, index) => (
        <section
          key={experience.id}
          id={experience.id}
          className={`${styles.block} ${index % 2 === 1 ? styles.reverse : ""}`}
          aria-labelledby={`${experience.id}-title`}
        >
          <Container wide className={styles.grid}>
            <figure className={styles.media}>
              <Image
                src={experience.media.src!}
                alt={experience.media.alt}
                fill
                sizes="(max-width: 960px) 100vw, 48vw"
                className={styles.image}
                priority={index === 0}
              />
            </figure>

            <div className={styles.copy}>
              <p className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 id={`${experience.id}-title`}>{experience.title}</h2>
              <p className={styles.description}>{experience.description}</p>
              <ul className={styles.highlights}>
                {experience.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button href="/availability" variant="primary">
                Check Your Date
              </Button>
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}
