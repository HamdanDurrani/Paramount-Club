import { formatEnquiryDate } from "@/data/calendar";
import type { SelectedDateEntry } from "@/types";
import styles from "./SelectedDatesSummary.module.css";

interface SelectedDatesSummaryProps {
  dates: SelectedDateEntry[];
  celebrationType?: string;
  onChangeDates: () => void;
}

export function SelectedDatesSummary({
  dates,
  celebrationType,
  onChangeDates,
}: SelectedDatesSummaryProps) {
  return (
    <aside className={styles.summary} aria-labelledby="selected-dates-heading">
      <div className={styles.top}>
        <div>
          <p className={styles.eyebrow}>Your selected dates</p>
          <h3 id="selected-dates-heading" className={styles.title}>
            {dates.length} date{dates.length === 1 ? "" : "s"} locked in
          </h3>
          {celebrationType ? (
            <p className={styles.celebration}>{celebrationType}</p>
          ) : null}
        </div>
        <button
          type="button"
          className={styles.changeBtn}
          onClick={onChangeDates}
        >
          Change dates
        </button>
      </div>

      <ul className={styles.list}>
        {dates.map((entry) => (
          <li key={entry.date} className={styles.item}>
            <span className={styles.date}>{formatEnquiryDate(entry.date)}</span>
            {entry.note ? (
              <span className={styles.note}>{entry.note}</span>
            ) : (
              <span className={styles.noteMuted}>No role note</span>
            )}
          </li>
        ))}
      </ul>

      <p className={styles.hint}>
        Need a different day? Go back to the calendar to add or remove dates.
      </p>
    </aside>
  );
}
