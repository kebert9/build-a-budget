"use client";

import { Card } from "./Card";
import { CheckboxLine, Input, Label, Select } from "./Field";
import { useAppStore } from "../store/useAppStore";
import { AgeBand, FundingStream, GSQRating } from "../store/schema";

const streams: { key: FundingStream; label: string }[] = [
  { key: "EHS", label: "Early Head Start" },
  { key: "HS", label: "Head Start" },
  { key: "GSRP", label: "GSRP" },
  { key: "CDC", label: "CDC Scholarships" },
  { key: "CACFP", label: "CACFP" },
  { key: "TUITION", label: "Tuition" },
  { key: "TRISHARE", label: "Tri-Share" }
];

const ageBands: { key: AgeBand; label: string }[] = [
  { key: "INFANT_TODDLER", label: "Infant/Toddler" },
  { key: "PRESCHOOL", label: "Preschool" },
  { key: "SCHOOL_AGE", label: "School-Age" }
];

const gsqOptions: { key: GSQRating; label: string }[] = [
  { key: "health", label: "Maintaining Health & Safety" },
  { key: "reflecting", label: "Reflecting on Quality" },
  { key: "enhancing", label: "Enhancing Quality" },
  { key: "enhancing-validated", label: "Enhancing Quality–Validated" },
  { key: "demonstrating", label: "Demonstrating Quality" }
];

export function ProgramProfileForm() {
  const { activeScenario, updateProgram } = useAppStore();
  const p = activeScenario.program;

  return (
    <>
      <Card title="Funding Streams Accepted">
        <div className="grid md:grid-cols-2 gap-2">
          {streams.map((s) => (
            <div key={s.key} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <CheckboxLine
                checked={p.accepts[s.key]}
                onChange={(v) =>
                  updateProgram({ accepts: { ...p.accepts, [s.key]: v } })
                }
                label={s.label}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Tip: You can still calculate child eligibility even if you don’t accept a stream; the app will label it as “eligible but not available.”
        </p>
      </Card>

      <Card title="Program Schedule (used for annualization)">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>General hours/day</Label>
            <Input
              type="number"
              step="0.5"
              value={p.general.hoursPerDay}
              onChange={(e) => updateProgram({ general: { ...p.general, hoursPerDay: Number(e.target.value) } })}
            />
          </div>
          <div>
            <Label>General days/week</Label>
            <Input
              type="number"
              value={p.general.daysPerWeek}
              onChange={(e) => updateProgram({ general: { ...p.general, daysPerWeek: Number(e.target.value) } })}
            />
          </div>
          <div>
            <Label>General weeks/year</Label>
            <Input
              type="number"
              value={p.general.weeksPerYear}
              onChange={(e) => updateProgram({ general: { ...p.general, weeksPerYear: Number(e.target.value) } })}
            />
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <div className="font-semibold text-slate-800 mb-3">Head Start / Early Head Start schedule</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Hours/day</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={p.hs?.hoursPerDay ?? 0}
                  onChange={(e) => updateProgram({ hs: { ...(p.hs ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), hoursPerDay: Number(e.target.value) } })}
                />
              </div>
              <div>
                <Label>Days/week</Label>
                <Input
                  type="number"
                  value={p.hs?.daysPerWeek ?? 0}
                  onChange={(e) => updateProgram({ hs: { ...(p.hs ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), daysPerWeek: Number(e.target.value) } })}
                />
              </div>
              <div>
                <Label>Weeks/year</Label>
                <Input
                  type="number"
                  value={p.hs?.weeksPerYear ?? 0}
                  onChange={(e) => updateProgram({ hs: { ...(p.hs ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), weeksPerYear: Number(e.target.value) } })}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <div className="font-semibold text-slate-800 mb-3">GSRP schedule</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Hours/day</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={p.gsrp?.hoursPerDay ?? 0}
                  onChange={(e) => updateProgram({ gsrp: { ...(p.gsrp ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), hoursPerDay: Number(e.target.value) } })}
                />
              </div>
              <div>
                <Label>Days/week</Label>
                <Input
                  type="number"
                  value={p.gsrp?.daysPerWeek ?? 0}
                  onChange={(e) => updateProgram({ gsrp: { ...(p.gsrp ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), daysPerWeek: Number(e.target.value) } })}
                />
              </div>
              <div>
                <Label>Weeks/year</Label>
                <Input
                  type="number"
                  value={p.gsrp?.weeksPerYear ?? 0}
                  onChange={(e) => updateProgram({ gsrp: { ...(p.gsrp ?? { hoursPerDay: 0, daysPerWeek: 0, weeksPerYear: 0 }), weeksPerYear: Number(e.target.value) } })}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Grants + Quality Rating">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Head Start grant (annual $)</Label>
            <Input type="number" value={p.hsGrantAnnual} onChange={(e) => updateProgram({ hsGrantAnnual: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Early Head Start grant (annual $)</Label>
            <Input type="number" value={p.ehsGrantAnnual} onChange={(e) => updateProgram({ ehsGrantAnnual: Number(e.target.value) })} />
          </div>
          <div>
            <Label>EHS-CCP grant (annual $)</Label>
            <Input type="number" value={p.ehsCcpGrantAnnual} onChange={(e) => updateProgram({ ehsCcpGrantAnnual: Number(e.target.value) })} />
          </div>
        </div>

        <div className="mt-4 max-w-md">
          <Label>Great Start to Quality rating (CDC)</Label>
          <Select
            value={p.gsqRating ?? "enhancing"}
            onChange={(e) => updateProgram({ gsqRating: e.target.value as GSQRating })}
          >
            {gsqOptions.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </Select>
        </div>
      </Card>

      <Card title="Tuition Weekly Rates (vary by PT/FT)">
        <div className="grid gap-4">
          {ageBands.map((a) => (
            <div key={a.key} className="border border-slate-100 bg-slate-50 rounded-lg p-4">
              <div className="font-semibold text-slate-800 mb-3">{a.label}</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Part-time weekly ($)</Label>
                  <Input
                    type="number"
                    value={p.tuitionWeekly[a.key].PT}
                    onChange={(e) =>
                      updateProgram({
                        tuitionWeekly: {
                          ...p.tuitionWeekly,
                          [a.key]: { ...p.tuitionWeekly[a.key], PT: Number(e.target.value) }
                        }
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Full-time weekly ($)</Label>
                  <Input
                    type="number"
                    value={p.tuitionWeekly[a.key].FT}
                    onChange={(e) =>
                      updateProgram({
                        tuitionWeekly: {
                          ...p.tuitionWeekly,
                          [a.key]: { ...p.tuitionWeekly[a.key], FT: Number(e.target.value) }
                        }
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
