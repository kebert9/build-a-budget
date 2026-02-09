export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-5">
      {title ? <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2> : null}
      {children}
    </div>
  );
}
