import { ChildFundingResult, FundingStream, ProgramProfile, ChildProfile } from "../store/schema";
import { calcAgeBand } from "./ageBand";

// NOTE: This is MVP scaffolding.
// We will replace internals with your MI-specific rules + annualization (CDC split, CACFP, etc.).
export function computeChildFunding(program: ProgramProfile, child: ChildProfile): ChildFundingResult {
  const ageBand = calcAgeBand(child.dob);

  const eligible: Record<FundingStream, "YES" | "NO" | "CONDITIONAL"> = {
    EHS: "NO",
    HS: "NO",
    GSRP: "NO",
    CDC: "NO",
    CACFP: program.accepts.CACFP ? "YES" : "NO",
    TUITION: program.accepts.TUITION ? "YES" : "NO",
    TRISHARE: "NO"
  };

  const annualRevenue: Partial<Record<FundingStream, number>> = {};

  // Tuition placeholder logic (real logic will pick PT/FT & annualize)
  if (program.accepts.TUITION) {
    const weekly = program.tuitionWeekly[ageBand][child.enrollmentStatus];
    annualRevenue.TUITION = weekly * program.general.weeksPerYear;
  }

  const notes: Partial<Record<FundingStream, string>> = {
    TUITION: "MVP: tuition annualized from weekly PT/FT rate × general weeks/year."
  };

  return { childId: child.id, ageBand, eligible, annualRevenue, notes };
}
