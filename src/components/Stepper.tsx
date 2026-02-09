export type StepKey = "PROGRAM" | "CHILDREN" | "SUMMARY" | "EXPENSES" | "ALLOCATION";

const steps: { key: StepKey; label: string }[] = [
  { key: "PROGRAM", label: "1) Program Profile" },
  { key: "CHILDREN", label: "2) Child Profiles" },
  { key: "SUMMARY", label: "3) Revenue Summary" },
  { key: "EXPENSES", label: "4) Expenses" },
  { key: "ALLOCATION", label: "5) Allocation" }
];

export function Stepper({ active, onChange }: { active: StepKey; onChange: (s: StepKey) => void }) {
  return (
    <div className="bg-white/60 backdrop-blur rounded-xl p-3 shadow mb-5">
      <div className="flex flex-wrap gap-2">
        {steps.map((s) => (
          <button
            key={s.key}
            onClick={() => onChange(s.key)}
            className={[
              "px-3 py-2 rounded-lg text-sm font-medium transition",
              s.key === active
                ? "bg-slate-700 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            ].join(" ")}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
