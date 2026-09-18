"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/common/Button";
import {
  STAGE_NO_ID,
  STAGE_UPLOAD_ID,
  cateringOptions,
  dateRoleOptions,
  eventTypes,
  facilityPreferenceOptions,
  guestRanges,
  parkingEstimates,
} from "@/data/availability";
import { formatEnquiryDate } from "@/data/calendar";
import { stageDesigns } from "@/data/stageDesigns";
import { checkAvailability } from "@/lib/api";
import type {
  AvailabilityInquiry,
  CateringPreference,
  DateRoleNote,
  EventType,
  SelectedDateEntry,
  StagePreference,
} from "@/types";
import styles from "./AvailabilityForm.module.css";

const STEPS = ["Dates", "Preferences", "Details"] as const;
const STEP_TITLES = [
  "Select dates & celebration",
  "Preferences",
  "Your details",
] as const;

const FEATURED_DESIGNS = stageDesigns.slice(0, 4);
const STEP_MS = 380;
const SUBMIT_MIN_MS = 700;

export const initialInquiryState: AvailabilityInquiry = {
  celebrationType: "",
  selectedDates: [],
  additionalDatesNote: "",
  expectedGuests: "3,500 – 5,000",
  catering: "",
  wantsStage: "",
  decorId: "",
  decorUploadName: "",
  facilitiesNeeded: [],
  parkingEstimate: parkingEstimates[0],
  name: "",
  email: "",
  phone: "",
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function validateStep(
  step: number,
  values: AvailabilityInquiry,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!values.celebrationType) {
      errors.celebrationType = "Please select one celebration type.";
    }
    if (values.selectedDates.length === 0) {
      errors.selectedDates = "Please select at least one date on the calendar.";
    }
    if (!values.expectedGuests) {
      errors.expectedGuests = "Please select expected guests.";
    }
  }

  if (step === 1) {
    if (!values.catering) {
      errors.catering = "Please select a catering preference.";
    }
    if (!values.wantsStage) {
      errors.wantsStage = "Please tell us if you need a stage.";
    }
    if (values.wantsStage === "yes" && !values.decorId) {
      errors.decorId =
        "Please choose a design, upload your own, or browse more designs.";
    }
  }

  if (step === 2) {
    if (!values.name.trim()) errors.name = "Please enter your name.";
    if (!values.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (values.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  return errors;
}

interface AvailabilityFormProps {
  step: number;
  onStepChange: (step: number) => void;
  values: AvailabilityInquiry;
  onChange: (next: AvailabilityInquiry) => void;
  onUpdateDateNote: (date: string, note: DateRoleNote) => void;
  onRemoveDate: (date: string) => void;
  success: boolean;
  onSuccessChange: (success: boolean) => void;
}

export function AvailabilityForm({
  step,
  onStepChange,
  values,
  onChange,
  onUpdateDateNote,
  onRemoveDate,
  success,
  onSuccessChange,
}: AvailabilityFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [renderStep, setRenderStep] = useState(step);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (values.selectedDates.length === 0) return;
    setErrors((prev) => {
      if (!prev.selectedDates) return prev;
      const next = { ...prev };
      delete next.selectedDates;
      return next;
    });
  }, [values.selectedDates]);

  useEffect(() => {
    if (step === renderStep) return;

    let cancelled = false;
    const reduced = prefersReducedMotion();
    setDirection(step > renderStep ? "forward" : "back");

    if (reduced) {
      setRenderStep(step);
      setPhase("in");
      return;
    }

    setPhase("out");
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      setRenderStep(step);
      setPhase("in");
      panelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, STEP_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [step, renderStep]);

  const patch = <K extends keyof AvailabilityInquiry>(
    field: K,
    value: AvailabilityInquiry[K],
  ) => {
    onChange({ ...values, [field]: value });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const setCelebrationType = (type: EventType) => {
    onChange({ ...values, celebrationType: type });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.celebrationType;
      return next;
    });
  };

  const setWantsStage = (choice: StagePreference) => {
    if (choice === "no") {
      onChange({
        ...values,
        wantsStage: "no",
        decorId: STAGE_NO_ID,
        decorUploadName: "",
      });
    } else if (choice === "yes") {
      onChange({
        ...values,
        wantsStage: "yes",
        decorId: values.decorId === STAGE_NO_ID ? "" : values.decorId,
      });
    } else {
      patch("wantsStage", choice);
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.wantsStage;
      delete next.decorId;
      return next;
    });
  };

  const selectDesign = (id: string) => {
    onChange({
      ...values,
      decorId: id,
      decorUploadName: "",
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.decorId;
      return next;
    });
  };

  const onUpload = (file: File | null) => {
    if (!file) return;
    onChange({
      ...values,
      decorId: STAGE_UPLOAD_ID,
      decorUploadName: file.name,
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.decorId;
      return next;
    });
  };

  const toggleFacility = (id: string) => {
    const exists = values.facilitiesNeeded.includes(id);
    patch(
      "facilitiesNeeded",
      exists
        ? values.facilitiesNeeded.filter((item) => item !== id)
        : [...values.facilitiesNeeded, id],
    );
  };

  const goNext = () => {
    const nextErrors = validateStep(step, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    startTransition(() => {
      onStepChange(Math.min(step + 1, STEPS.length - 1));
    });
  };

  const goBack = () => {
    startTransition(() => {
      onStepChange(Math.max(step - 1, 0));
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const stepErrors = validateStep(2, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    setSubmitting(true);
    const started = Date.now();
    const result = await checkAvailability(values);
    const wait = Math.max(0, SUBMIT_MIN_MS - (Date.now() - started));
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error || "Something went wrong. Please try again.");
      return;
    }

    onSuccessChange(true);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div
      ref={panelRef}
      className={`${styles.formShell} ${submitting ? styles.formSubmitting : ""} ${success ? styles.formLocked : ""}`}
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Date request</p>
          <h3 className={styles.formTitle} key={renderStep}>
            {STEP_TITLES[renderStep]}
          </h3>
        </div>

        <div className={styles.progressBlock}>
          <ol className={styles.steps} aria-label="Request steps">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={`${styles.step} ${index === step ? styles.stepActive : ""} ${index < step ? styles.stepDone : ""}`}
              >
                <span className={styles.stepIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={`${renderStep}-${phase}`}
          className={`${styles.stepViewport} ${styles[direction]} ${phase === "out" ? styles.stepOut : styles.stepIn}`}
          aria-live="polite"
        >
          {renderStep === 0 ? (
            <div className={styles.section}>
              <fieldset className={styles.fieldset}>
                <legend>Celebration type</legend>
                <p className={styles.hint}>Choose one primary celebration type.</p>
                <div
                  className={styles.chips}
                  role="radiogroup"
                  aria-label="Celebration type"
                >
                  {eventTypes.map((type) => {
                    const active = values.celebrationType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                        aria-pressed={active}
                        onClick={() => setCelebrationType(type)}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
                {errors.celebrationType ? (
                  <em className={styles.error}>{errors.celebrationType}</em>
                ) : null}
              </fieldset>

              <div className={styles.datesBlock}>
                <p className={styles.blockLabel}>Selected dates</p>
                {values.selectedDates.length === 0 ? (
                  <p className={styles.emptyDates}>
                    Use the calendar to select up to 4 open dates.
                  </p>
                ) : (
                  <ul className={styles.dateList}>
                    {values.selectedDates.map(
                      (entry: SelectedDateEntry, index) => (
                        <li
                          key={entry.date}
                          className={styles.dateRow}
                          style={{ animationDelay: `${index * 60}ms` }}
                        >
                          <div className={styles.dateMeta}>
                            <span className={styles.dateLabel}>
                              {formatEnquiryDate(entry.date)}
                            </span>
                            <button
                              type="button"
                              className={styles.removeDate}
                              onClick={() => onRemoveDate(entry.date)}
                              aria-label={`Remove ${entry.date}`}
                            >
                              Remove
                            </button>
                          </div>
                          <label className={styles.noteField}>
                            <span>Role note</span>
                            <select
                              value={entry.note}
                              onChange={(e) =>
                                onUpdateDateNote(
                                  entry.date,
                                  e.target.value as DateRoleNote,
                                )
                              }
                            >
                              <option value="">Optional — Barat, Walima…</option>
                              {dateRoleOptions.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </label>
                        </li>
                      ),
                    )}
                  </ul>
                )}
                {errors.selectedDates ? (
                  <em className={styles.error}>{errors.selectedDates}</em>
                ) : null}
              </div>

              <div
                className={`${styles.reveal} ${values.selectedDates.length >= 4 ? styles.revealOpen : ""}`}
              >
                <div className={styles.revealInner}>
                  <label className={styles.field}>
                    <span>Need more than 4 dates?</span>
                    <textarea
                      rows={3}
                      placeholder="Add extra dates or notes here — or contact us and we’ll help plan the full sequence."
                      value={values.additionalDatesNote}
                      onChange={(e) =>
                        patch("additionalDatesNote", e.target.value)
                      }
                    />
                    <span className={styles.fieldHint}>
                      Prefer to speak with us?{" "}
                      <Link href="/contact" className={styles.inlineLink}>
                        Contact Paramount Club
                      </Link>
                    </span>
                  </label>
                </div>
              </div>

              <label className={styles.field}>
                <span>Expected guests</span>
                <select
                  value={values.expectedGuests}
                  onChange={(e) => patch("expectedGuests", e.target.value)}
                >
                  {guestRanges.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          {renderStep === 1 ? (
            <div className={styles.section}>
              <fieldset className={styles.fieldset}>
                <legend>Catering</legend>
                <div className={styles.radioList}>
                  {cateringOptions.map((option) => (
                    <label key={option} className={styles.radio}>
                      <input
                        type="radio"
                        name="catering"
                        value={option}
                        checked={values.catering === option}
                        onChange={() =>
                          patch("catering", option as CateringPreference)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.catering ? (
                  <em className={styles.error}>{errors.catering}</em>
                ) : null}
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Do you need a stage?</legend>
                <div className={styles.yesNo}>
                  {(["yes", "no"] as const).map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      className={`${styles.choice} ${values.wantsStage === choice ? styles.choiceActive : ""}`}
                      aria-pressed={values.wantsStage === choice}
                      onClick={() => setWantsStage(choice)}
                    >
                      {choice === "yes" ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
                {errors.wantsStage ? (
                  <em className={styles.error}>{errors.wantsStage}</em>
                ) : null}
              </fieldset>

              <div
                className={`${styles.reveal} ${values.wantsStage === "yes" ? styles.revealOpen : ""}`}
              >
                <div className={styles.revealInner}>
                  <div className={styles.stageBlock}>
                    <p className={styles.blockLabel}>Stage designs</p>
                    <p className={styles.hint}>
                      Select a direction below, upload your own design, or browse
                      our full collection.
                    </p>

                    <div className={styles.designGrid}>
                      {FEATURED_DESIGNS.map((design) => {
                        const active = values.decorId === design.id;
                        return (
                          <button
                            key={design.id}
                            type="button"
                            className={`${styles.designCard} ${active ? styles.designActive : ""}`}
                            aria-pressed={active}
                            onClick={() => selectDesign(design.id)}
                          >
                            <span className={styles.designMedia}>
                              <Image
                                src={design.src}
                                alt={design.alt}
                                fill
                                sizes="(max-width: 700px) 50vw, 180px"
                                className={styles.designImage}
                              />
                            </span>
                            <span className={styles.designBody}>
                              <span className={styles.designTitle}>
                                {design.title}
                              </span>
                              <span className={styles.designDesc}>
                                {design.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className={styles.stageActions}>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*,.pdf"
                        className={styles.fileInput}
                        onChange={(e) =>
                          onUpload(e.target.files?.[0] ?? null)
                        }
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => fileRef.current?.click()}
                      >
                        {values.decorId === STAGE_UPLOAD_ID &&
                        values.decorUploadName
                          ? `Uploaded: ${values.decorUploadName}`
                          : "Upload your design"}
                      </Button>
                      <Link href="/stage-designs" className={styles.viewMore}>
                        View more designs
                      </Link>
                    </div>

                    {errors.decorId ? (
                      <em className={styles.error}>{errors.decorId}</em>
                    ) : null}
                  </div>
                </div>
              </div>

              <fieldset className={styles.fieldset}>
                <legend>Facilities</legend>
                <div className={styles.chips}>
                  {facilityPreferenceOptions.map((item) => {
                    const active = values.facilitiesNeeded.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                        aria-pressed={active}
                        onClick={() => toggleFacility(item.id)}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <p className={styles.hint}>
                  Select what you expect to need — we’ll confirm everything with
                  you.
                </p>
              </fieldset>

              <label className={styles.field}>
                <span>Parking estimate</span>
                <select
                  value={values.parkingEstimate}
                  onChange={(e) => patch("parkingEstimate", e.target.value)}
                >
                  {parkingEstimates.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          {renderStep === 2 ? (
            <div className={styles.section}>
              <div className={styles.grid}>
                <label className={styles.field}>
                  <span>Full name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => patch("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? (
                    <em className={styles.error}>{errors.name}</em>
                  ) : null}
                </label>

                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => patch("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? (
                    <em className={styles.error}>{errors.email}</em>
                  ) : null}
                </label>

                <label className={styles.field}>
                  <span>Phone</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => patch("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? (
                    <em className={styles.error}>{errors.phone}</em>
                  ) : null}
                </label>
              </div>

              <p className={styles.summary}>
                Submit your request and our team will confirm whether your
                preferred dates are available — then guide you through the next
                steps.
              </p>
            </div>
          ) : null}
        </div>

        {formError ? (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        ) : null}

        <div className={styles.actions}>
          {step > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={goBack}
              disabled={submitting || phase === "out"}
            >
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              variant="primary"
              onClick={goNext}
              disabled={phase === "out"}
            >
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Sending…" : "Request Your Date"}
            </Button>
          )}
        </div>
      </form>

      {submitting ? (
        <div className={styles.submitOverlay} aria-hidden="true">
          <span className={styles.submitPulse} />
          <p>Sending your request…</p>
        </div>
      ) : null}
    </div>
  );
}
