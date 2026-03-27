"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "dark" ? "text-[#1a1a1a]" : "text-white";
  
  return (
    <Link href="/" className={`flex flex-col items-center ${className}`}>
      <div className={`text-3xl font-bold ${textColor}`}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-1"
        >
          <path
            d="M16 4C16 4 8 8 8 16C8 20 10 24 16 28C22 24 24 20 24 16C24 8 16 4 16 4Z"
            fill="currentColor"
          />
          <circle cx="16" cy="14" r="4" fill={variant === "dark" ? "#fafafa" : "#1a1a1a"} />
        </svg>
      </div>
      <span className={`text-sm tracking-[0.3em] font-medium ${textColor}`}>
        BANAYAA
      </span>
    </Link>
  );
}
