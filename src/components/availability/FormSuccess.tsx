import { Button } from "@/components/common/Button";
import styles from "./FormSuccess.module.css";

interface FormSuccessProps {
  onReset?: () => void;
  title?: string;
  message?: string;
  tone?: "dark" | "light";
  /** Full celebration with animated tick (availability submit). */
  celebrate?: boolean;
}

export function FormSuccess({
  onReset,
  title = "Thank You",
  message = "Your date request has been received. Our team will contact you regarding availability.",
  tone = "dark",
  celebrate = false,
}: FormSuccessProps) {
  return (
    <div
      className={`${styles.success} ${tone === "light" ? styles.light : ""} ${celebrate ? styles.celebrate : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.tickWrap} aria-hidden="true">
        <svg className={styles.tickSvg} viewBox="0 0 88 88" fill="none">
          <circle className={styles.tickRingSoft} cx="44" cy="44" r="40" />
          <circle className={styles.tickRing} cx="44" cy="44" r="40" />
          <path
            className={styles.tickMark}
            d="M26 45.5 L38.5 57.5 L62.5 32"
          />
        </svg>
        {celebrate ? <span className={styles.tickBurst} /> : null}
      </div>

      <p className={styles.eyebrow}>Request Received</p>
      <h2 className={styles.title} id="availability-success-title">
        {title}
      </h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        {onReset ? (
          <Button type="button" variant="secondary" onClick={onReset}>
            Submit Another Date
          </Button>
        ) : null}
        <Button href="/contact" variant="primary">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
