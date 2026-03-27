"use client";

import { useEffect, useState } from "react";

export function DecorHeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Banayaa Decor
            </span>
          </div>

          <div
            className={`mt-6 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] italic leading-tight">
              Banayaa
              <br />
              Decor
            </h1>
          </div>

          <div
            className={`mt-8 space-y-3 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e87d3e]" />
              <span className="text-sm text-[#1a1a1a]">Handcrafted wooden pieces</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e87d3e]" />
              <span className="text-sm text-[#1a1a1a]">
                100% natural | Scratch-proof | Long-lasting | Food-safe
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e87d3e]" />
              <span className="text-sm text-[#1a1a1a]">
                Perfect for homes, restaurants & cafés
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="h-full min-h-[500px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
              alt="Wooden serving tray with sushi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
