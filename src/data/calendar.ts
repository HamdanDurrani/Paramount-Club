/**
 * Availability calendar helpers.
 * The public form treats every future date as selectable; the office confirms later.
 */

import type { CalendarDemoDay } from "@/types";

/** Guests may request dates through December of this year. */
export const CALENDAR_MAX_YEAR = 2050;

export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getCalendarBounds(today: Date = startOfToday()) {
  const min = { year: today.getFullYear(), monthIndex: today.getMonth() };
  const max = { year: CALENDAR_MAX_YEAR, monthIndex: 11 };
  return { min, max };
}

export function getSelectableYears(today: Date = startOfToday()): number[] {
  const { min, max } = getCalendarBounds(today);
  const years: number[] = [];
  for (let year = min.year; year <= max.year; year += 1) {
    years.push(year);
  }
  return years;
}

export function isMonthInBounds(
  year: number,
  monthIndex: number,
  today: Date = startOfToday(),
): boolean {
  const { min, max } = getCalendarBounds(today);
  if (year < min.year || year > max.year) return false;
  if (year === min.year && monthIndex < min.monthIndex) return false;
  if (year === max.year && monthIndex > max.monthIndex) return false;
  return true;
}

/** If the chosen year makes the current month invalid, snap to the nearest valid month. */
export function clampMonthForYear(
  year: number,
  monthIndex: number,
  today: Date = startOfToday(),
): number {
  if (isMonthInBounds(year, monthIndex, today)) return monthIndex;
  const { min, max } = getCalendarBounds(today);
  if (year === min.year) return min.monthIndex;
  if (year === max.year) return max.monthIndex;
  return Math.min(11, Math.max(0, monthIndex));
}

export const CALENDAR_DEMO_NOTE =
  "Select up to 4 preferred dates. Use the month and year menus to jump ahead — our team confirms every request personally.";

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function todayISO(): string {
  return toISODate(startOfToday());
}

export function addMonths(year: number, monthIndex: number, delta: number) {
  const date = new Date(year, monthIndex + delta, 1);
  return { year: date.getFullYear(), monthIndex: date.getMonth() };
}

export function monthLabel(year: number, monthIndex: number): string {
  return new Date(year, monthIndex, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function formatEnquiryDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function buildMonthDays(
  year: number,
  monthIndex: number,
  today: Date = startOfToday(),
): CalendarDemoDay[] {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startPad = first.getDay();
  const todayIso = toISODate(today);
  const { max } = getCalendarBounds(today);
  const maxIso = toISODate(new Date(max.year, max.monthIndex + 1, 0));

  const cells: CalendarDemoDay[] = [];

  for (let i = 0; i < startPad; i += 1) {
    cells.push({ date: null, status: "empty" });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (iso < todayIso || iso > maxIso) {
      cells.push({ date: iso, status: "past" });
      continue;
    }

    cells.push({ date: iso, status: "available" });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date: null, status: "empty" });
  }

  return cells;
}
