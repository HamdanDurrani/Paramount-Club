import { Container } from "@/components/common/Container";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ballroomSpaces } from "@/data/venue";
import styles from "./BallroomSection.module.css";

export function BallroomSection() {
  const [primary, secondary, ...rest] = ballroomSpaces;

  return (
    <section className={styles.section} aria-labelledby="ballroom-heading">
      <Container wide>
        <SectionHeading
          eyebrow="Spaces"
          title={<span id="ballroom-heading">The Grand Ballroom</span>}
          subtitle="Designed to bring extraordinary celebrations to life."
          className={styles.heading}
        />

        <div className={styles.featured}>
          <MediaPlaceholder
            kind={primary.media.kind}
            src={primary.media.src}
            alt={primary.media.alt}
            label={primary.media.label}
            aspectRatio="16 / 9"
            className={styles.featuredMedia}
          />
          <div className={styles.featuredCopy}>
            <h3>{primary.title}</h3>
            <p>{primary.description}</p>
          </div>
        </div>

        <div className={styles.split}>
          <MediaPlaceholder
            kind={secondary.media.kind}
            src={secondary.media.src}
            alt={secondary.media.alt}
            label={secondary.media.label}
            aspectRatio="16 / 10"
          />
          <div className={styles.splitCopy}>
            <h3>{secondary.title}</h3>
            <p>{secondary.description}</p>
          </div>
        </div>

        <div className={styles.grid}>
          {rest.map((space) => (
            <article key={space.id} className={styles.item}>
              <MediaPlaceholder
                kind={space.media.kind}
                src={space.media.src}
                alt={space.media.alt}
                label={space.media.label}
                aspectRatio={space.media.aspectRatio}
              />
              <h3>{space.title}</h3>
              <p>{space.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
