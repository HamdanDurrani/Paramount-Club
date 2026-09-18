import { Container } from "@/components/common/Container";
import { WhyChooseIcon } from "@/components/home/WhyChooseIcon";
import { whyChooseItems, whyChooseTitle } from "@/data/whyChoose";
import styles from "./WhyChooseSection.module.css";

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className={styles.section}
      aria-labelledby="why-choose-heading"
    >
      <Container wide>
        <div className={styles.panel}>
          <h2 id="why-choose-heading" className={styles.title}>
            {whyChooseTitle}
          </h2>

          <div className={styles.grid}>
            {whyChooseItems.map((item) => (
              <article key={item.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <WhyChooseIcon name={item.icon} className={styles.icon} />
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
                <p className={styles.itemCopy}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
