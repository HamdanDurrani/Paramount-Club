import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { services, servicesIntro } from "@/data/services";
import styles from "./ServicesSection.module.css";

export function ServicesSection() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <Container wide>
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 id="services-heading" className={styles.title}>
              {servicesIntro.title}
            </h2>
            <div className={styles.intro}>
              {servicesIntro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <div className={styles.grid}>
            {services.map((service) => (
              <article key={service.id} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardCopy}>{service.description}</p>
                  <Link href={service.href} className={styles.cta}>
                    <span>{service.ctaLabel}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
