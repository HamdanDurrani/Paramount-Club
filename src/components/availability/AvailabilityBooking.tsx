"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { AvailabilityCalendar } from "@/components/availability/AvailabilityCalendar";
import {
  AvailabilityForm,
  initialInquiryState,
} from "@/components/availability/AvailabilityForm";
import { FormSuccess } from "@/components/availability/FormSuccess";
import { SelectedDatesSummary } from "@/components/availability/SelectedDatesSummary";
import { Container } from "@/components/common/Container";
import { availabilityPageContent } from "@/data/availability";
import type { AvailabilityInquiry, DateRoleNote } from "@/types";
import styles from "./AvailabilityBooking.module.css";

const SUCCESS_MESSAGE =
  "Thank you. We’ve received your date request — our managers will get in touch with you shortly to confirm availability and guide the next steps for your celebration.";

export function AvailabilityBooking() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<AvailabilityInquiry>(initialInquiryState);
  const [success, setSuccess] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [, startTransition] = useTransition();
  const { booking } = availabilityPageContent;

  const selecting = step === 0 && !success;
  const reviewing = step > 0 && !success;

  const resetAll = useCallback(() => {
    setShowOverlay(false);
    setSuccess(false);
    setValues(initialInquiryState);
    setStep(0);
  }, []);

  useEffect(() => {
    if (!success) {
      setShowOverlay(false);
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById("date-request")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });

    const timer = window.setTimeout(
      () => setShowOverlay(true),
      reduced ? 0 : 320,
    );

    return () => window.clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    if (!showOverlay) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") resetAll();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showOverlay, resetAll]);

  const handleStepChange = (next: number) => {
    startTransition(() => setStep(next));
  };

  const toggleDate = (date: string) => {
    setValues((prev) => {
      const exists = prev.selectedDates.some((entry) => entry.date === date);
      if (exists) {
        return {
          ...prev,
          selectedDates: prev.selectedDates.filter(
            (entry) => entry.date !== date,
          ),
        };
      }
      if (prev.selectedDates.length >= 4) {
        return prev;
      }
      return {
        ...prev,
        selectedDates: [
          ...prev.selectedDates,
          { date, note: "" as DateRoleNote },
        ].sort((a, b) => a.date.localeCompare(b.date)),
      };
    });
  };

  const updateDateNote = (date: string, note: DateRoleNote) => {
    setValues((prev) => ({
      ...prev,
      selectedDates: prev.selectedDates.map((entry) =>
        entry.date === date ? { ...entry, note } : entry,
      ),
    }));
  };

  const removeDate = (date: string) => {
    setValues((prev) => ({
      ...prev,
      selectedDates: prev.selectedDates.filter((entry) => entry.date !== date),
    }));
  };

  return (
    <section
      id="date-request"
      className={`${styles.section} ${success ? styles.sectionSuccess : ""}`}
      aria-labelledby="date-request-heading"
    >
      <div
        className={`${styles.scene} ${success ? styles.sceneBlurred : ""}`}
        inert={showOverlay || undefined}
      >
        <Container wide>
          <header className={styles.header}>
            <p className={styles.eyebrow}>{booking.eyebrow}</p>
            <h2 id="date-request-heading" className={styles.heading}>
              {booking.heading}
            </h2>
            <p className={styles.body}>{booking.body}</p>
          </header>

          <div
            className={`${styles.layout} ${reviewing ? styles.layoutReviewing : ""}`}
          >
            <div
              className={`${styles.sideCol} ${selecting ? styles.sideSelecting : styles.sideReviewing}`}
            >
              <div
                className={`${styles.slot} ${styles.calendarSlot} ${selecting ? styles.slotOpen : styles.slotClosed}`}
                aria-hidden={!selecting}
                inert={!selecting || undefined}
              >
                <div className={styles.slotInner}>
                  <div
                    className={`${styles.pane} ${selecting ? styles.paneIn : styles.paneOut}`}
                  >
                    <AvailabilityCalendar
                      selectedDates={values.selectedDates.map(
                        (entry) => entry.date,
                      )}
                      onToggleDate={toggleDate}
                      maxDates={4}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${styles.slot} ${styles.summarySlot} ${selecting ? styles.slotClosed : styles.slotOpen}`}
                aria-hidden={selecting}
                inert={selecting || undefined}
              >
                <div className={styles.slotInner}>
                  <div
                    className={`${styles.pane} ${selecting ? styles.paneOut : styles.paneIn}`}
                  >
                    <SelectedDatesSummary
                      dates={values.selectedDates}
                      celebrationType={values.celebrationType || undefined}
                      onChangeDates={() => handleStepChange(0)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.panel}>
              <AvailabilityForm
                step={step}
                onStepChange={handleStepChange}
                values={values}
                onChange={setValues}
                onUpdateDateNote={updateDateNote}
                onRemoveDate={removeDate}
                success={success}
                onSuccessChange={setSuccess}
              />
            </div>
          </div>
        </Container>
      </div>

      {showOverlay ? (
        <div
          className={styles.successOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="availability-success-title"
        >
          <button
            type="button"
            className={styles.successDim}
            aria-label="Close success message"
            onClick={resetAll}
          />
          <div className={styles.successCard}>
            <FormSuccess
              celebrate
              title="Your request is with our team"
              message={SUCCESS_MESSAGE}
              onReset={resetAll}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
