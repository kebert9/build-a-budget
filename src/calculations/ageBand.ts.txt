import { AgeBand } from "../store/schema";

export function calcAgeBand(dobISO: string, now = new Date()): AgeBand {
  const dob = new Date(dobISO);
  const ageMs = now.getTime() - dob.getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);

  if (ageYears < 2.5) return "INFANT_TODDLER";
  if (ageYears < 5) return "PRESCHOOL";
  return "SCHOOL_AGE";
}
