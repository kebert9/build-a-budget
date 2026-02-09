"use client";

import { useMemo, useState } from "react";
import { Card } from "./Card";
import { CheckboxLine, Input, Label, RadioLine } from "./Field";
import { ChildProfile, EnrollmentStatus } from "../store/schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (child: Omit<ChildProfile, "id">) => void;
};

export function ChildFormModal({ open, onClose, onSave }: Props) {
  const [label, setLabel] = useState("Child 1");
  const [dob, setDob] = useState("");
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>("FT");
  const [householdSize, setHouseholdSize] = useState(3);
  const [annualIncome, setAnnualIncome] = useState<number | null>(null);

  const [working, setWorking] = useState(false);
  const [training, setTraining] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [familyPreservation, setFamilyPreservation] = useState(false);
  const [noneParent, setNoneParent] = useState(false);
  const [trishareEmployer, setTrishareEmployer] = useState<boolean | undefined>(undefined);

  const [homeless, setHomeless] = useState(false);
  const [foster, setFoster] = useState(false);
  const [noneCirc, setNoneCirc] = useState(false);

  const [breakfast, setBreakfast] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [snack, setSnack] = useState(0);

  const canSave = useMemo(() => {
    return label.trim().length > 0 && dob.trim().length > 0 && householdSize > 0;
  }, [label, dob, householdSize]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl mt-8">
        <Card title="Add Child Profile">
          <div className="text-xs text-slate-500 mb-4">
            Please avoid entering full names. Use initials or “Child A.”
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Child label</Label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div>
              <Label>Date of birth</Label>
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <Label>Enrollment status</Label>
            <div className="flex flex-col gap-2">
              <RadioLine
                name="enroll"
                checked={enrollmentStatus === "PT"}
                onChange={() => setEnrollmentStatus("PT")}
                label="Part-time (1–60 hours/week)"
              />
              <RadioLine
                name="enroll"
                checked={enrollmentStatus === "FT"}
                onChange={() => setEnrollmentStatus("FT")}
                label="Full-time (61+ hours/week)"
              />
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div>
              <Label>Household size</Label>
              <Input type="number" value={householdSize} onChange={(e) => setHouseholdSize(Number(e.target.value))} />
              <div className="text-xs text-slate-500 mt-1">Count all people supported by household income.</div>
            </div>
            <div>
              <Label>Approx. annual household income ($)</Label>
              <Input
                type="number"
                value={annualIncome ?? ""}
                onChange={(e) => setAnnualIncome(e.target.value === "" ? null : Number(e.target.value))}
              />
              <div className="text-xs text-slate-500 mt-1">Planning only. Converted to % FPL internally.</div>
            </div>
          </div>

          <div className="mt-6">
            <Label>Parent/guardian situation (select all that apply)</Label>
            <div className="grid md:grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-4">
              <CheckboxLine checked={working} onChange={(v) => { setWorking(v); if (!v) setTrishareEmployer(undefined); }} label="Working" />
              <CheckboxLine checked={training} onChange={setTraining} label="In job training / education" />
              <CheckboxLine checked={seeking} onChange={setSeeking} label="Seeking employment" />
              <CheckboxLine checked={familyPreservation} onChange={setFamilyPreservation} label="Family preservation / approved support program" />
              <CheckboxLine checked={noneParent} onChange={setNoneParent} label="None of the above" />
            </div>

            {working ? (
              <div className="mt-3 bg-slate-50 border border-slate-100 rounded-lg p-4">
                <Label>Is the employer a MI Tri-Share participating employer?</Label>
                <div className="flex gap-6">
                  <RadioLine
                    name="trishare"
                    checked={trishareEmployer === true}
                    onChange={() => setTrishareEmployer(true)}
                    label="Yes"
                  />
                  <RadioLine
                    name="trishare"
                    checked={trishareEmployer === false}
                    onChange={() => setTrishareEmployer(false)}
                    label="No"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            <Label>Special circumstances (select all that apply)</Label>
            <div className="grid md:grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-4">
              <CheckboxLine checked={homeless} onChange={setHomeless} label="Experiencing homelessness" />
              <CheckboxLine checked={foster} onChange={setFoster} label="Foster care placement" />
              <CheckboxLine checked={noneCirc} onChange={setNoneCirc} label="None of the above" />
            </div>
          </div>

          <div className="mt-6">
            <Label>Meals received weekly (CACFP)</Label>
            <div className="grid md:grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-lg p-4">
              <div>
                <Label>Breakfast (0–7)</Label>
                <Input type="number" min={0} max={7} value={breakfast} onChange={(e) => setBreakfast(Number(e.target.value))} />
              </div>
              <div>
                <Label>Lunch/Supper (0–14)</Label>
                <Input type="number" min={0} max={14} value={lunch} onChange={(e) => setLunch(Number(e.target.value))} />
              </div>
              <div>
                <Label>Snacks (0–14)</Label>
                <Input type="number" min={0} max={14} value={snack} onChange={(e) => setSnack(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              disabled={!canSave}
              onClick={() => {
                if (!canSave) return;
                onSave({
                  label,
                  dob,
                  enrollmentStatus,
                  householdSize,
                  annualIncome,
                  parentStatus: {
                    working,
                    training,
                    seeking,
                    familyPreservation,
                    none: noneParent,
                    trishareEmployer
                  },
                  circumstances: { homeless, foster, none: noneCirc },
                  mealsPerWeek: { breakfast, lunch, snack }
                });
                onClose();
              }}
              className={[
                "px-4 py-2 rounded-lg text-white font-semibold",
                canSave ? "bg-slate-700 hover:bg-slate-800" : "bg-slate-400"
              ].join(" ")}
            >
              Save Child
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
