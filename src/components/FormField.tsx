import type { InputHTMLAttributes } from "react";
import PasswordInput from "./PasswordInput";

export const fieldInputClassName =
  "w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  hint?: string;
}

const FormField = ({ label, hint, type = "text", ...props }: FormFieldProps) => (
  <label className="flex flex-col gap-2">
    <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
      {label}
    </span>
    {type === "password" ? (
      <PasswordInput {...props} className={fieldInputClassName} />
    ) : (
      <input type={type} {...props} className={fieldInputClassName} />
    )}
    {hint && <span className="text-xs text-ink/40">{hint}</span>}
  </label>
);

export default FormField;
