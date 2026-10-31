import type {
  AvailabilityInquiry,
  BookedDay,
  ContactInquiry,
  ShiftAvailability,
} from "@/types";

/**
 * API abstraction layer for future backend integration.
 * Do not invent fake network responses that look like real availability.
 *
 * Planned endpoints:
 *   GET  /api/events
 *   GET  /api/availability
 *   POST /api/availability/check
 *   POST /api/inquiries
 *   GET  /api/packages
 */

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const STAGE_FILE_MAX_BYTES = 8 * 1024 * 1024;
const STAGE_FILE_EXTENSION = /\.(jpe?g|png|webp|gif|pdf)$/i;

function stageFileProblem(file: File): string | null {
  if (!STAGE_FILE_EXTENSION.test(file.name)) {
    return "Upload a JPG, PNG, WEBP, GIF, or PDF design.";
  }
  if (file.size === 0) return "The design file was empty.";
  if (file.size > STAGE_FILE_MAX_BYTES) {
    return "That design file is too large. Maximum size is 8 MB.";
  }
  return null;
}

/**
 * Submit a date availability enquiry.
 * JSON when the guest picks a venue design. Multipart when they upload their own file.
 */
export async function checkAvailability(
  payload: AvailabilityInquiry,
  stageFile?: File | null,
): Promise<ApiResult<{ referenceId: string }>> {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) {
    return { ok: false, error: "The booking service is not configured." };
  }

  const uploadOwn = payload.decorId === "upload-own";
  if (uploadOwn && !(stageFile instanceof File)) {
    return {
      ok: false,
      error: "Please choose your stage design file again.",
    };
  }

  let response: Response;
  try {
    if (uploadOwn && stageFile) {
      const fileError = stageFileProblem(stageFile);
      if (fileError) return { ok: false, error: fileError };

      const form = new FormData();
      form.append(
        "payload",
        JSON.stringify({
          ...payload,
          decorId: "upload-own",
          decorUploadName: stageFile.name,
        }),
      );
      form.append("stage_file", stageFile, stageFile.name);
      response = await fetch(`${base}/api/v1/enquiries/website/with-stage`, {
        method: "POST",
        body: form,
      });
    } else {
      response = await fetch(`${base}/api/v1/enquiries/website`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch {
    return {
      ok: false,
      error: "Unable to reach the booking service. Please try again.",
    };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.status === 201) {
    const created = body as { reservation_number?: unknown };
    if (typeof created?.reservation_number === "string" && created.reservation_number) {
      return { ok: true, data: { referenceId: created.reservation_number } };
    }
    return {
      ok: false,
      error: "The booking service returned an unexpected response.",
    };
  }

  const detail =
    body && typeof body === "object" && "detail" in body
      ? (body as { detail: unknown }).detail
      : undefined;
  if (typeof detail === "string" && detail.trim()) {
    return { ok: false, error: detail };
  }

  return { ok: false, error: "Unable to submit your date request." };
}

export interface BookedSchedule {
  /** Days where both hall times are already confirmed. */
  dates: string[];
  /** Days where at least one hall time is confirmed. */
  days: BookedDay[];
}

const EMPTY_SCHEDULE: BookedSchedule = { dates: [], days: [] };

function asShift(value: unknown): ShiftAvailability | null {
  return value === "open" || value === "booked" ? value : null;
}

/**
 * Confirmed hall times for the public calendar. One request, no polling.
 * Pending enquiries are not included.
 */
export async function fetchBookedDates(
  from: string,
  to: string,
): Promise<BookedSchedule> {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) return EMPTY_SCHEDULE;

  try {
    const response = await fetch(
      `${base}/api/v1/enquiries/booked-dates?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      { cache: "no-store" },
    );
    if (!response.ok) return EMPTY_SCHEDULE;
    const body = (await response.json()) as { dates?: unknown; days?: unknown };
    const dates = Array.isArray(body.dates)
      ? body.dates.filter((date): date is string => typeof date === "string")
      : [];
    const days = Array.isArray(body.days)
      ? body.days.flatMap((item): BookedDay[] => {
          if (!item || typeof item !== "object") return [];
          const day = item as { date?: unknown; morning?: unknown; evening?: unknown };
          const morning = asShift(day.morning);
          const evening = asShift(day.evening);
          if (typeof day.date !== "string" || !morning || !evening) return [];
          return [{ date: day.date, morning, evening }];
        })
      : [];
    return { dates, days };
  } catch {
    return EMPTY_SCHEDULE;
  }
}

/**
 * Submit a general contact enquiry.
 * Replace with POST /api/inquiries when the backend is ready.
 */
export async function submitInquiry(
  payload: ContactInquiry,
): Promise<ApiResult<{ referenceId: string }>> {
  // TODO: Replace with POST /api/inquiries
  void payload;
  await Promise.resolve();
  return {
    ok: true,
    data: { referenceId: `local-${Date.now()}` },
  };
}
