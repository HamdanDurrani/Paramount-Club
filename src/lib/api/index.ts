import type { AvailabilityInquiry, ContactInquiry } from "@/types";

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

/**
 * Submit a date availability enquiry.
 * Currently stores nothing — returns a local success so the UI can show confirmation.
 * Replace the body with a real fetch to POST /api/availability/check when ready.
 */
export async function checkAvailability(
  payload: AvailabilityInquiry,
): Promise<ApiResult<{ referenceId: string }>> {
  // TODO: Replace with POST /api/availability/check
  // Example:
  // const res = await fetch("/api/availability/check", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) return { ok: false, error: "Unable to check availability." };
  // return { ok: true, data: await res.json() };

  void payload;
  await Promise.resolve();
  return {
    ok: true,
    data: { referenceId: `local-${Date.now()}` },
  };
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
