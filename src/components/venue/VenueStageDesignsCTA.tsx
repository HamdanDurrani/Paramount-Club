import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { venuePageContent } from "@/data/venue";
import styles from "./VenueStageDesignsCTA.module.css";

export function VenueStageDesignsCTA() {
  const { stageDesignsCta } = venuePageContent;

  return (
    <section
      className={styles.section}
      aria-labelledby="venue-stage-designs-cta-heading"
    >
      <Container className={styles.inner}>
        <p className={styles.eyebrow}>{stageDesignsCta.eyebrow}</p>
        <h2 id="venue-stage-designs-cta-heading" className={styles.title}>
          {stageDesignsCta.title}
        </h2>
        <p className={styles.body}>{stageDesignsCta.body}</p>
        <Button href={stageDesignsCta.ctaHref} variant="primary">
          {stageDesignsCta.ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
