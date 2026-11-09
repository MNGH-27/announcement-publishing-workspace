import type { InputHTMLAttributes } from 'react'

export function Input({
  label,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <label
      className="flex items-center gap-2 border border-slate-200 rounded-lg pt-2 pr-2.5 pb-2 pl-2.5 text-slate-500 bg-white [&_input]:min-w-0 [&_input]:w-full [&_input]:outline-none [&_input]:bg-transparent [&_input]:border-0 [&_input]:text-xs [&_input]:text-slate-600 [&:focus-within]:border-brand-400 [&:focus-within]:shadow-sm [&_input::placeholder]:text-slate-500"
      htmlFor={id}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">⌕</span>
      <input id={id} {...props} />
    </label>
  )
}
