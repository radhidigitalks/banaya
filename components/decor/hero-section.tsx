"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const FoodCanvas = dynamic(() => import("./food-canvas"), { ssr: false });

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

        {/* Right — Three.js 3D Scene */}
        <div
          className={`relative bg-[#fafaf8] transition-all duration-1000 delay-500 min-h-[500px] ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <FoodCanvas />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-[#1a1a1a]/40 uppercase select-none pointer-events-none">
            Drag to rotate
          </div>
        </div>
      </div>
    </section>
  );
}
