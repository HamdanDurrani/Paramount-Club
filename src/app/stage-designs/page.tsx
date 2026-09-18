import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { StageDesignGrid } from "@/components/stage-designs/StageDesignGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  stageDesignCategories,
  stageDesigns,
  stageDesignsPageContent,
} from "@/data/stageDesigns";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "Stage Designs",
  description:
    "Explore Paramount Club stage décor directions by celebration — Mehndi, Barat, Walima, engagements, birthdays, and private gatherings.",
  path: "/stage-designs",
});

export default function StageDesignsPage() {
  const { eyebrow, title, subtitle } = stageDesignsPageContent;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Venue", path: "/venue" },
          { name: "Stage Designs", path: "/stage-designs" },
        ])}
      />

      <section className={styles.hero}>
        <Container wide className={styles.heroInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </Container>
      </section>

      <section className={styles.section}>
        <Container wide>
          <StageDesignGrid
            items={stageDesigns}
            categories={stageDesignCategories}
          />
        </Container>
      </section>

      <section className={styles.cta}>
        <Container className={styles.ctaInner}>
          <h2>Found a direction you love?</h2>
          <p>
            Share your preferred stage style when you enquire — we&apos;ll help
            shape it around your celebration.
          </p>
          <div className={styles.actions}>
            <Button href="/availability" variant="primary">
              Check Your Date
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
