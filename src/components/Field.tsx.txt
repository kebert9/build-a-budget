export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700 mb-1">{children}</label>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-300",
        props.className ?? ""
      ].join(" ")}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-300",
        props.className ?? ""
      ].join(" ")}
    />
  );
}

export function CheckboxLine({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-slate-600"
      />
      {label}
    </label>
  );
}

export function RadioLine({
  checked,
  onChange,
  label,
  name
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  name: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-slate-600"
      />
      {label}
    </label>
  );
}
