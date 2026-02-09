import { nanoid } from "./nanoid";
import { Scenario } from "../store/schema";

export function makeDefaultScenario(name: string): Scenario {
  const id = nanoid();
  return {
    id,
    name,
    updatedAt: Date.now(),
    program: {
      id: nanoid(),
      name: "My Program",
      accepts: {
        EHS: false,
        HS: false,
        GSRP: false,
        CDC: false,
        CACFP: false,
        TUITION: true,
        TRISHARE: false
      },
      hsGrantAnnual: 0,
      ehsGrantAnnual: 0,
      ehsCcpGrantAnnual: 0,
      general: { hoursPerDay: 10, daysPerWeek: 5, weeksPerYear: 52 },
      hs: { hoursPerDay: 6, daysPerWeek: 5, weeksPerYear: 36 },
      gsrp: { hoursPerDay: 6, daysPerWeek: 4, weeksPerYear: 36 },
      gsqRating: "enhancing",
      tuitionWeekly: {
        INFANT_TODDLER: { PT: 200, FT: 350 },
        PRESCHOOL: { PT: 175, FT: 300 },
        SCHOOL_AGE: { PT: 120, FT: 220 }
      }
    },
    children: []
  };
}
