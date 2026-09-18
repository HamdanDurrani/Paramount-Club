"use client";

import { FormEvent, useState } from "react";
import styles from "./NewsletterForm.module.css";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !agreed) return;
    // Frontend-only — no backend newsletter integration yet.
    setDone(true);
  };

  if (done) {
    return (
      <p className={styles.success} role="status">
        Thank you. Your interest has been noted.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="footer-email" className="sr-only">
          Email
        </label>
        <input
          id="footer-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="EMAIL"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submit} aria-label="Subscribe">
          →
        </button>
      </div>
      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          required
        />
        <span>
          I agree to the{" "}
          <a href="/privacy">Privacy Policy</a>
        </span>
      </label>
    </form>
  );
}
