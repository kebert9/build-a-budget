import { Scenario, FundingStream } from "../store/schema";
import { computeChildFunding } from "./computeChildFunding";

export type RevenueSummary = {
  byStream: Partial<Record<FundingStream, number>>;
  perChild: ReturnType<typeof computeChildFunding>[];
  programLevel: { HS: number; EHS: number };
  total: number;
};

export function aggregateRevenue(s: Scenario): RevenueSummary {
  const perChild = s.children.map(c => computeChildFunding(s.program, c));

  const byStream: Partial<Record<FundingStream, number>> = {};
  for (const r of perChild) {
    for (const [k, v] of Object.entries(r.annualRevenue)) {
      const key = k as FundingStream;
      byStream[key] = (byStream[key] ?? 0) + (v ?? 0);
    }
  }

  const programLevel = {
    HS: s.program.hsGrantAnnual ?? 0,
    EHS: (s.program.ehsGrantAnnual ?? 0) + (s.program.ehsCcpGrantAnnual ?? 0)
  };

  const noteProgram = programLevel.HS + programLevel.EHS;

  const total = Object.values(byStream).reduce((a, b) => a + (b ?? 0), 0) + noteProgram;

  return { byStream, perChild, programLevel, total };
}
