import Link from "next/link";
import { Container } from "@/components/common/Container";
import type { LegalSection } from "@/data/legal";
import styles from "./LegalDocument.module.css";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  alternateHref: string;
  alternateLabel: string;
};

export function LegalDocument({
  eyebrow,
  title,
  subtitle,
  updated,
  intro,
  sections,
  alternateHref,
  alternateLabel,
}: LegalDocumentProps) {
  return (
    <>
      <section className={styles.hero} data-hero aria-label={title}>
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <span className={styles.rule} aria-hidden="true" />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.updated}>Last updated · {updated}</p>
        </Container>
      </section>

      <section className={styles.body} aria-label={`${title} content`}>
        <Container className={styles.content}>
          <p className={styles.intro}>{intro}</p>

          <div className={styles.sections}>
            {sections.map((section, index) => (
              <article key={section.heading} className={styles.section}>
                <p className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className={styles.sectionCopy}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={`${section.heading}-p-${pIndex}`}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((item, bIndex) => (
                        <li key={`${section.heading}-b-${bIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.aside}>
            <p>
              Looking for related terms? Read our{" "}
              <Link href={alternateHref}>{alternateLabel}</Link>.
            </p>
            <p>
              Questions about your enquiry or celebration?{" "}
              <Link href="/contact">Contact us</Link>.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
