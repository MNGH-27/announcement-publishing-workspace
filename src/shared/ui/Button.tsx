import type { ButtonHTMLAttributes } from 'react'

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
