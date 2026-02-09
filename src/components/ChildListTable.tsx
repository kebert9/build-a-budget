"use client";

import { ChildProfile } from "../store/schema";

export function ChildListTable({
  children,
  selectedId,
  onSelect,
  onDelete
}: {
  children: ChildProfile[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (children.length === 0) {
    return <div className="text-sm text-slate-600">No children added yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-600">
            <th className="py-2">Child</th>
            <th className="py-2">DOB</th>
            <th className="py-2">PT/FT</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {children.map((c) => (
            <tr
              key={c.id}
              className={[
                "border-t border-slate-100",
                c.id === selectedId ? "bg-slate-50" : ""
              ].join(" ")}
            >
              <td className="py-2">
                <button className="text-slate-800 font-medium hover:underline" onClick={() => onSelect(c.id)}>
                  {c.label}
                </button>
              </td>
              <td className="py-2 text-slate-600">{c.dob}</td>
              <td className="py-2 text-slate-600">{c.enrollmentStatus}</td>
              <td className="py-2 text-right">
                <button className="text-slate-500 hover:text-red-600" onClick={() => onDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
