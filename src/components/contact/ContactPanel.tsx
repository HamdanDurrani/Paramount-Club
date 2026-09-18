import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactDetails, contactPageContent } from "@/data/contact";
import { CONTACT } from "@/lib/site";
import styles from "./ContactPanel.module.css";

export function ContactPanel() {
  const { details, form, map } = contactPageContent;

  return (
    <section className={styles.section} aria-labelledby="contact-panel-heading">
      <Container wide className={styles.grid}>
        <aside className={styles.info}>
          <p className={styles.eyebrow}>{details.eyebrow}</p>
          <h2 id="contact-panel-heading" className={styles.heading}>
            {details.heading}
          </h2>
          <p className={styles.body}>{details.body}</p>

          <dl className={styles.list}>
            {contactDetails.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {"href" in item && item.href ? (
                    <a href={item.href} className={styles.detailLink}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.map}>
            <p className={styles.mapLabel}>{map.label}</p>
            <div className={styles.mapFrame}>
              <iframe
                title="Paramount Club on Google Maps"
                src={CONTACT.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className={styles.mapNote}>{map.note}</p>
            <a
              href={CONTACT.mapUrl}
              className={styles.mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {map.directionsLabel}
            </a>
          </div>
        </aside>

        <div className={styles.formPanel}>
          <p className={styles.eyebrow}>{form.eyebrow}</p>
          <h2 className={styles.formHeading}>{form.heading}</h2>
          <p className={styles.formBody}>{form.body}</p>
          <ContactForm tone="light" />
        </div>
      </Container>
    </section>
  );
}
