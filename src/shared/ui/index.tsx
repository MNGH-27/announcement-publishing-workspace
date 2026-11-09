import type { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-3 rounded-lg pt-2.5 pr-3.5 pb-2.5 pl-3.5 text-xs font-semibold border border-transparent transition-colors motion-reduce:transition-none [&:disabled]:opacity-50 [&:disabled]:shadow-none ${{ primary: 'bg-brand-500 text-white shadow-sm [&:hover:not(:disabled)]:bg-brand-600', secondary: 'border-slate-200 bg-white text-slate-600 [&:hover:not(:disabled)]:bg-brand-50', ghost: '[&:hover:not(:disabled)]:bg-brand-50 text-brand-500 bg-transparent' }[variant]} ${className}`}
      {...props}
    />
  )
}
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
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 pt-1 pr-2 pb-1 pl-2 rounded-md text-xs font-medium whitespace-nowrap [&_>_span]:text-xs ${{ neutral: 'bg-slate-100 text-slate-500', success: 'bg-emerald-50 text-emerald-600', warning: 'bg-amber-50 text-amber-700', danger: 'bg-red-50 text-red-600' }[tone]}`}
    >
      <span aria-hidden="true">●</span> {children}
    </span>
  )
}
export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}
      {...props}
    />
  )
}
export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pt-7 pr-4 pb-7 pl-4 text-center [&_h3]:text-sm [&_p]:text-xs [&_p]:text-slate-500 [&_p]:mt-2">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
