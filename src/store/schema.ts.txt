export type FundingStream =
  | "EHS"
  | "HS"
  | "GSRP"
  | "CDC"
  | "CACFP"
  | "TUITION"
  | "TRISHARE";

export type AgeBand = "INFANT_TODDLER" | "PRESCHOOL" | "SCHOOL_AGE";
export type EnrollmentStatus = "PT" | "FT";

export type GSQRating =
  | "health"
  | "reflecting"
  | "enhancing"
  | "enhancing-validated"
  | "demonstrating";

export type Schedule = {
  hoursPerDay: number;
  daysPerWeek: number;
  weeksPerYear: number;
};

export type ProgramProfile = {
  id: string;
  name: string;

  accepts: Record<FundingStream, boolean>;

  hsGrantAnnual: number;
  ehsGrantAnnual: number;
  ehsCcpGrantAnnual: number;

  general: Schedule;
  hs?: Schedule;
  gsrp?: Schedule;

  gsqRating?: GSQRating;

  tuitionWeekly: Record<AgeBand, { PT: number; FT: number }>;
};

export type ChildProfile = {
  id: string;
  label: string; // no full names

  dob: string; // ISO date
  enrollmentStatus: EnrollmentStatus;

  householdSize: number;
  annualIncome: number | null;

  parentStatus: {
    working: boolean;
    training: boolean;
    seeking: boolean;
    familyPreservation: boolean;
    none: boolean;
    trishareEmployer?: boolean;
  };

  circumstances: {
    homeless: boolean;
    foster: boolean;
    none: boolean;
  };

  mealsPerWeek: { breakfast: number; lunch: number; snack: number };
};

export type ChildFundingResult = {
  childId: string;
  ageBand: AgeBand;
  eligible: Record<FundingStream, "YES" | "NO" | "CONDITIONAL">;
  annualRevenue: Partial<Record<FundingStream, number>>;
  notes: Partial<Record<FundingStream, string>>;
};

export type Scenario = {
  id: string;
  name: string;
  program: ProgramProfile;
  children: ChildProfile[];
  updatedAt: number;
};

export type AppState = {
  scenarios: Scenario[];
  activeScenarioId: string;
};
