import React from "react"

type InputProps = {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

export default function Input({ label, value, onChange, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-semibold text-black">{label}</label>}
      <input
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a57db] ${className}`}
        {...props}
      />
    </div>
  )
}
