export const ADMIN_EMAILS = ["rei.is.eureka@gmail.com"];

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function createFacilitySlug(name: string, area: string) {
  const normalized = `${area}-${name}`
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || `facility-${Date.now()}`;
}

export function parseSeatTypes(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
