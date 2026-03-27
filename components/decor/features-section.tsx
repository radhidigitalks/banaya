"use client";

import { Phone } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-8 md:px-16 bg-[#f5f5f0] overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="font-serif text-[15vw] text-[#1a1a1a]/5 tracking-[0.1em] uppercase">
          BANAYAA
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"
                alt="Wooden serving plate"
                className="w-full max-w-md mx-auto"
              />
              {/* Decorative leaves */}
              <div className="absolute -top-8 -right-8 w-24 h-24 opacity-60">
                <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
                  <path
                    fill="currentColor"
                    d="M50 10 C30 30, 10 50, 50 90 C90 50, 70 30, 50 10"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] italic leading-tight">
                Handcrafted
                <br />
                wooden pieces
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                100% natural | Scratch-proof | Long-lasting | Food-safe
              </p>
              <p className="text-sm text-muted-foreground">
                Perfect for homes, restaurants & cafés
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-[#1a1a1a] text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#c9a962] transition-colors">
                Order Now
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e87d3e] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1a1a1a] font-medium">8855817434</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
