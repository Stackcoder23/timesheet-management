import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-[#1a57db] text-white rounded-md px-4 py-2 hover:bg-[#164abf] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
