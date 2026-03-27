"use client";

import { Logo } from "./logo";

interface HeaderProps {
  variant?: "dark" | "light" | "transparent";
}

export function Header({ variant = "dark" }: HeaderProps) {
  const bgClass = variant === "transparent" 
    ? "bg-transparent" 
    : variant === "light" 
      ? "bg-white" 
      : "bg-[#1a1a1a]";
  
  const logoVariant = variant === "dark" ? "light" : "dark";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bgClass}`}>
      <div className="flex items-center justify-center py-6">
        <Logo variant={logoVariant} />
      </div>
    </header>
  );
}
