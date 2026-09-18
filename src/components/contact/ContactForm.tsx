"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { FormSuccess } from "@/components/availability/FormSuccess";
import { submitInquiry } from "@/lib/api";
import type { ContactInquiry } from "@/types";
import styles from "./ContactForm.module.css";

const initialState: ContactInquiry = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(values: ContactInquiry): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

interface ContactFormProps {
  tone?: "dark" | "light";
}

export function ContactForm({ tone = "light" }: ContactFormProps) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const onChange = (field: keyof ContactInquiry, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await submitInquiry(values);
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error || "Unable to send your message. Please try again.");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <FormSuccess
        tone={tone}
        title="Message received"
        message="Thank you for contacting Paramount Club. Our team will respond shortly to help with your celebration."
        onReset={() => {
          setSuccess(false);
          setValues(initialState);
        }}
      />
    );
  }

  return (
    <form
      className={`${styles.form} ${tone === "light" ? styles.light : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <em className={styles.error}>{errors.name}</em> : null}
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <em className={styles.error}>{errors.email}</em> : null}
        </label>
        <label className={styles.field}>
          <span>Phone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <em className={styles.error}>{errors.phone}</em> : null}
        </label>
        <label className={styles.field}>
          <span>Subject</span>
          <input
            type="text"
            placeholder="e.g. Barat enquiry"
            value={values.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            aria-invalid={Boolean(errors.subject)}
          />
          {errors.subject ? (
            <em className={styles.error}>{errors.subject}</em>
          ) : null}
        </label>
      </div>
      <label className={styles.field}>
        <span>Message</span>
        <textarea
          rows={5}
          placeholder="Share your preferred date, guest count, or any questions."
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <em className={styles.error}>{errors.message}</em>
        ) : null}
      </label>
      {formError ? (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
