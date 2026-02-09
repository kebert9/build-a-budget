"use client";

import { Card } from "./Card";
import { useAppStore } from "../store/useAppStore";
import { aggregateRevenue } from "../calculations/aggregate";

export function RevenueSummary() {
  const { activeScenario } = useAppStore();
  const summary = aggregateRevenue(activeScenario);

  return (
    <>
      <Card title="Revenue Summary">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <div className="text-xs text-slate-500">Total annual revenue</div>
            <div className="text-2xl font-bold text-slate-900">
              ${Math.round(summary.total).toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <div className="text-xs text-slate-500">Program-level HS grant</div>
            <div className="text-xl font-semibold text-slate-900">
              ${Math.round(summary.programLevel.HS).toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <div className="text-xs text-slate-500">Program-level EHS + EHS-CCP</div>
            <div className="text-xl font-semibold text-slate-900">
              ${Math.round(summary.programLevel.EHS).toLocaleString()}
            </div>
          </div>
        </div>
      </Card>

      <Card title="By Funding Stream (children + tuition in MVP)">
        <div className="text-sm text-slate-700">
          {Object.entries(summary.byStream).length === 0 ? (
            <div className="text-slate-600">Add children to see aggregated totals.</div>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(summary.byStream).map(([k, v]) => (
                <li key={k}>
                  <span className="font-medium">{k}</span>: ${Math.round(v ?? 0).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card title="Per-Child Annual Revenue (MVP)">
        {summary.perChild.length === 0 ? (
          <div className="text-sm text-slate-600">No children yet.</div>
        ) : (
          <div className="space-y-3">
            {summary.perChild.map((r) => (
              <div key={r.childId} className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-800">{activeScenario.children.find(c => c.id === r.childId)?.label}</div>
                  <div className="text-xs text-slate-500">{r.ageBand}</div>
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  {Object.entries(r.annualRevenue).length === 0 ? (
                    <span className="text-slate-500">No revenue computed.</span>
                  ) : (
                    <ul className="list-disc pl-5">
                      {Object.entries(r.annualRevenue).map(([k, v]) => (
                        <li key={k}>
                          {k}: ${Math.round(v ?? 0).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {r.notes.TUITION ? <div className="mt-2 text-xs text-slate-500">{r.notes.TUITION}</div> : null}
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
