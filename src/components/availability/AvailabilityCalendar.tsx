"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CALENDAR_DEMO_NOTE,
  addMonths,
  buildMonthDays,
  getCalendarBounds,
  monthLabel,
  startOfToday,
} from "@/data/calendar";
import styles from "./AvailabilityCalendar.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AvailabilityCalendarProps {
  selectedDates: string[];
  onToggleDate: (date: string) => void;
  maxDates?: number;
}

export function AvailabilityCalendar({
  selectedDates,
  onToggleDate,
  maxDates = 4,
}: AvailabilityCalendarProps) {
  const today = useMemo(() => startOfToday(), []);
  const bounds = useMemo(() => getCalendarBounds(today), [today]);
  const [cursor, setCursor] = useState(() => ({
    year: today.getFullYear(),
    monthIndex: today.getMonth(),
  }));

  const days = useMemo(
    () => buildMonthDays(cursor.year, cursor.monthIndex, today),
    [cursor.year, cursor.monthIndex, today],
  );

  const canGoPrev =
    cursor.year > bounds.min.year ||
    (cursor.year === bounds.min.year &&
      cursor.monthIndex > bounds.min.monthIndex);
  const canGoNext =
    cursor.year < bounds.max.year ||
    (cursor.year === bounds.max.year &&
      cursor.monthIndex < bounds.max.monthIndex);

  const goPrev = () => {
    if (!canGoPrev) return;
    setCursor((prev) => addMonths(prev.year, prev.monthIndex, -1));
  };

  const goNext = () => {
    if (!canGoNext) return;
    setCursor((prev) => addMonths(prev.year, prev.monthIndex, 1));
  };

  const selectedSet = useMemo(() => new Set(selectedDates), [selectedDates]);
  const atLimit = selectedDates.length >= maxDates;

  return (
    <section className={styles.wrap} aria-labelledby="calendar-heading">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Availability</p>
          <h3 id="calendar-heading" className={styles.title}>
            {monthLabel(cursor.year, cursor.monthIndex)}
          </h3>
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.legend} aria-label="Calendar legend">
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotAvailable}`} /> Open
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotBooked}`} /> Reserved
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotSelected}`} /> Selected
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotPast}`} /> Past
        </span>
      </div>

      <p className={styles.note} role="note">
        {CALENDAR_DEMO_NOTE}
      </p>

      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.grid} role="grid" aria-label="Availability calendar">
        {days.map((cell, index) => {
          if (!cell.date) {
            return <div key={`empty-${index}`} className={styles.empty} />;
          }

          const dayNum = Number(cell.date.slice(-2));
          const isSelected = selectedSet.has(cell.date);
          const isBooked = cell.status === "booked";
          const isPast = cell.status === "past";
          const isBlocked = atLimit && !isSelected;

          if (isBooked || isPast) {
            return (
              <div
                key={cell.date}
                className={`${styles.day} ${isBooked ? styles.booked : styles.past}`}
                aria-label={
                  isPast
                    ? `${cell.date}, unavailable — past date`
                    : `${cell.date}, reserved for ${cell.eventType}`
                }
              >
                <span className={styles.dayNum}>{dayNum}</span>
                {isBooked && cell.eventType ? (
                  <span className={styles.chip}>{cell.eventType}</span>
                ) : null}
              </div>
            );
          }

          return (
            <button
              key={cell.date}
              type="button"
              className={`${styles.day} ${styles.available} ${
                isSelected ? styles.selected : ""
              } ${isBlocked ? styles.blocked : ""}`}
              aria-label={`${cell.date}, open${isSelected ? ", selected" : ""}${isBlocked ? ", limit reached" : ""}`}
              aria-pressed={isSelected}
              disabled={isBlocked}
              onClick={() => onToggleDate(cell.date!)}
            >
              <span className={styles.dayNum}>{dayNum}</span>
              <span className={styles.statusLabel}>
                {isSelected ? "Selected" : "Open"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedDates.length > 0 ? (
        <p className={styles.selectionCount}>
          {selectedDates.length} of {maxDates} date
          {maxDates === 1 ? "" : "s"} selected
          {atLimit ? " · maximum reached" : ""}
        </p>
      ) : (
        <p className={styles.selectionCount}>
          Select up to {maxDates} dates
        </p>
      )}

      <p className={styles.moreDates}>
        {atLimit
          ? "Need more dates? Add a note in your request, or "
          : "Need more than 4 dates? Add a note once you’ve selected 4, or "}
        <Link href="/contact">contact us</Link>.
      </p>
    </section>
  );
}
