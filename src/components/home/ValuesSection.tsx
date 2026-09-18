import Image from "next/image";
import { Container } from "@/components/common/Container";
import { values, valuesIntro } from "@/data/values";
import styles from "./ValuesSection.module.css";

export function ValuesSection() {
  return (
    <section className={styles.section} aria-labelledby="values-heading">
      <Container wide>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{valuesIntro.eyebrow}</p>
          <h2 id="values-heading" className={styles.title}>
            {valuesIntro.title}
          </h2>
        </header>

        <div className={styles.grid}>
          {values.map((value) => (
            <article key={value.id} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={value.image}
                  alt={value.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 20vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardCopy}>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
