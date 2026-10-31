/**
 * Availability calendar helpers.
 * Open days are every future date that is not already confirmed in the API.
 */

import type { BookedDay, CalendarDemoDay } from "@/types";

export const CALENDAR_DEMO_NOTE =
  "Select up to 4 open dates within the next year. Past dates cannot be chosen — our team confirms every request personally.";

/** How many months ahead (inclusive of current month) guests may browse. */
export const CALENDAR_MONTHS_AHEAD = 12;

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

export function blockedHallShifts(
  selectedDates: readonly string[],
  days: readonly BookedDay[],
): { morning: boolean; evening: boolean } {
  const byDate = new Map(days.map((day) => [day.date, day]));
  let morning = false;
  let evening = false;
  for (const date of selectedDates) {
    const day = byDate.get(date);
    if (!day) continue;
    if (day.morning === "booked") morning = true;
    if (day.evening === "booked") evening = true;
  }
  return { morning, evening };
}

export function buildMonthDays(
  year: number,
  monthIndex: number,
  today: Date = startOfToday(),
  bookedDates: ReadonlySet<string> = new Set(),
  bookedDays: ReadonlyMap<string, BookedDay> = new Map(),
): CalendarDemoDay[] {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startPad = first.getDay();
  const todayIso = toISODate(today);

  const cells: CalendarDemoDay[] = [];

  for (let i = 0; i < startPad; i += 1) {
    cells.push({ date: null, status: "empty" });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (iso < todayIso) {
      cells.push({ date: iso, status: "past" });
      continue;
    }

    const shifts = bookedDays.get(iso);
    const bothBooked =
      bookedDates.has(iso) ||
      (shifts?.morning === "booked" && shifts.evening === "booked");

    if (bothBooked) {
      cells.push({
        date: iso,
        status: "booked",
        morning: "booked",
        evening: "booked",
      });
      continue;
    }

    cells.push({
      date: iso,
      status: "available",
      morning: shifts?.morning,
      evening: shifts?.evening,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date: null, status: "empty" });
  }

  return cells;
}

export function getCalendarBounds(today: Date = startOfToday()) {
  const min = { year: today.getFullYear(), monthIndex: today.getMonth() };
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + (CALENDAR_MONTHS_AHEAD - 1),
    1,
  );
  const max = {
    year: maxDate.getFullYear(),
    monthIndex: maxDate.getMonth(),
  };
  return { min, max };
}
