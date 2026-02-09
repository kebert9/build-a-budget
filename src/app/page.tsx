export const dynamic = 'force-dynamic';
"use client";

import { useMemo, useState } from "react";
import { Stepper, StepKey } from "../components/Stepper";
import { ProgramProfileForm } from "../components/ProgramProfileForm";
import { Card } from "../components/Card";
import { useAppStore } from "../store/useAppStore";
import { ChildFormModal } from "../components/ChildFormModal";
import { ChildListTable } from "../components/ChildListTable";
import { RevenueSummary } from "@/components/RevenueSummary";

export default function Page() {
  const {
    scenarios,
    activeScenario,
    activeScenarioId,
    setActiveScenario,
    addScenario,
    renameScenario,
    deleteScenario,
    addChild,
    deleteChild
  } = useAppStore();

  const [step, setStep] = useState<StepKey>("PROGRAM");
  const [childModalOpen, setChildModalOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const headerTitle = useMemo(() => {
    switch (step) {
      case "PROGRAM": return "Creating Your Program Profile";
      case "CHILDREN": return "Creating Child Profiles";
      case "SUMMARY": return "Revenue Summary";
      case "EXPENSES": return "Expenses (coming soon)";
      case "ALLOCATION": return "Allocation (coming soon)";
    }
  }, [step]);

  return (
    <div className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Build-A-Budget</h1>
          <h2 className="text-xl font-semibold text-slate-600 mt-2">{headerTitle}</h2>
          <p className="text-sm text-slate-500 mt-2">
            Plan blended/braided revenue by building a program profile, adding children, and aggregating funding.
          </p>
        </div>

        <Card title="Scenario">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Active scenario</div>
              <select
                value={activeScenarioId}
                onChange={(e) => setActiveScenario(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
              >
                {scenarios.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addScenario()}
                className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800"
              >
                + New scenario
              </button>
              <button
                onClick={() => {
                  const name = prompt("Rename scenario:", activeScenario.name);
                  if (name && name.trim()) renameScenario(activeScenario.id, name.trim());
                }}
                className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm hover:bg-slate-50"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  if (scenarios.length <= 1) return;
                  const ok = confirm("Delete this scenario? This cannot be undone.");
                  if (ok) deleteScenario(activeScenario.id);
                }}
                disabled={scenarios.length <= 1}
                className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm hover:bg-slate-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </Card>

        <Stepper active={step} onChange={setStep} />

        {step === "PROGRAM" ? (
          <ProgramProfileForm />
        ) : null}

        {step === "CHILDREN" ? (
          <>
            <Card title="Child Profiles">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-600">
                  Add one profile per child. Use labels (no full names).
                </div>
                <button
                  onClick={() => setChildModalOpen(true)}
                  className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800"
                >
                  + Add child
                </button>
              </div>

              <ChildListTable
                children={activeScenario.children}
                selectedId={selectedChildId}
                onSelect={(id) => setSelectedChildId(id)}
                onDelete={(id) => {
                  const ok = confirm("Delete this child?");
                  if (ok) deleteChild(id);
                  if (selectedChildId === id) setSelectedChildId(null);
                }}
              />
            </Card>

            <ChildFormModal
              open={childModalOpen}
              onClose={() => setChildModalOpen(false)}
              onSave={(child) => addChild(child)}
            />
          </>
        ) : null}

        {step === "SUMMARY" ? <RevenueSummary /> : null}

        {step === "EXPENSES" ? (
          <Card title="Expenses (coming soon)">
            <div className="text-sm text-slate-600">
              Next: enter annual costs, shared cost pools, and allocation methods.
            </div>
          </Card>
        ) : null}

        {step === "ALLOCATION" ? (
          <Card title="Allocation (coming soon)">
            <div className="text-sm text-slate-600">
              Next: allocate costs across funding streams + generate documentation checklists.
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}


