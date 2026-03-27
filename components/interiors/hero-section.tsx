"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
        {/* Top Label */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#1a1a1a]" />
            <span className="text-xs tracking-[0.2em] text-[#1a1a1a] uppercase">
              Banaya Interiors
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`max-w-2xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs tracking-[0.15em] text-[#1a1a1a]/70 uppercase mb-4">
            Interior Design Studio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-[0.9] italic">
            Spaces that
            <br />
            speak softly.
          </h1>
        </div>

        {/* Bottom CTA */}
        <div
          className={`flex justify-end transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#c9a962] transition-colors flex items-center gap-2">
            View Portfolio
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
