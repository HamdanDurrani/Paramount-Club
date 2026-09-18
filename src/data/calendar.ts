/**
 * Availability calendar helpers.
 * Visual guide for the enquiry flow — final confirmation is always with our team.
 */

import type { CalendarDemoDay, CalendarDemoEvent } from "@/types";

export const CALENDAR_DEMO_NOTE =
  "Select up to 4 open dates within the next year. Past dates cannot be chosen — our team confirms every request personally.";

/** How many months ahead (inclusive of current month) guests may browse. */
export const CALENDAR_MONTHS_AHEAD = 12;

/** Seeded demo reservations so the calendar shows reserved days year-round. */
export const calendarDemoBookings: CalendarDemoEvent[] = [
  { date: "2026-09-05", eventType: "Barat" },
  { date: "2026-09-12", eventType: "Walima" },
  { date: "2026-09-19", eventType: "Barat" },
  { date: "2026-09-26", eventType: "Walima" },
];

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

/** First Saturday of each month marked reserved for demo realism. */
function buildRollingDemoBookings(
  from: Date,
  months: number,
): Map<string, "Barat" | "Walima"> {
  const map = new Map<string, "Barat" | "Walima">();

  for (const booking of calendarDemoBookings) {
    map.set(booking.date, booking.eventType);
  }

  for (let i = 0; i < months; i += 1) {
    const cursor = new Date(from.getFullYear(), from.getMonth() + i, 1);
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const firstSaturday = 1 + ((6 - firstDay + 7) % 7);
    const iso = toISODate(new Date(year, month, firstSaturday));
    if (!map.has(iso)) {
      map.set(iso, i % 2 === 0 ? "Barat" : "Walima");
    }
  }

  return map;
}

export function buildMonthDays(
  year: number,
  monthIndex: number,
  today: Date = startOfToday(),
): CalendarDemoDay[] {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startPad = first.getDay();
  const bookingMap = buildRollingDemoBookings(today, CALENDAR_MONTHS_AHEAD);
  const todayIso = toISODate(today);

  const cells: CalendarDemoDay[] = [];

  for (let i = 0; i < startPad; i += 1) {
    cells.push({ date: null, status: "empty" });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const eventType = bookingMap.get(iso);

    if (iso < todayIso) {
      cells.push({ date: iso, status: "past" });
      continue;
    }

    cells.push({
      date: iso,
      status: eventType ? "booked" : "available",
      eventType,
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
