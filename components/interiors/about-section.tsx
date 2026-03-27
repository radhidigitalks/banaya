"use client";

import { useState } from "react";
import { Home, Key, Building2 } from "lucide-react";

export function AboutSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    { icon: Home, text: "20+ Bespoke Interiors Delivered" },
    { icon: Key, text: "Turnkey Solutions" },
    { icon: Building2, text: "Franchise Design Experts" },
  ];

  return (
    <section className="relative py-24 px-8 md:px-16 bg-[#fafafa] overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Images */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative group">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
                alt="Wardrobe interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="ml-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#c9a962]/20 p-2 transition-all duration-500 hover:bg-[#c9a962]/40 hover:scale-110">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80"
                  alt="Decorative detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center Image */}
        <div className="lg:col-span-4">
          <div className="aspect-[3/4] overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Modern dining room"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="text-xs tracking-[0.2em] text-[#1a1a1a] uppercase mb-4">
              Design with Purpose.
            </h2>
            <h3 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] leading-tight">
              Executed with
              <br />
              Precision.
            </h3>
          </div>

          {/* Decorative wireframe sphere */}
          <div className="absolute top-8 right-8 w-20 h-20 opacity-30 animate-spin" style={{ animationDuration: '20s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 -ml-3 rounded-lg transition-all duration-300 cursor-pointer ${
                  hoveredFeature === index ? 'bg-[#1a1a1a] text-white' : 'hover:bg-[#f0ebe3]'
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <feature.icon className={`w-5 h-5 transition-colors ${hoveredFeature === index ? 'text-[#c9a962]' : 'text-[#1a1a1a]'}`} />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          <h4 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#1a1a1a] tracking-tight">
            INTERIORS
          </h4>

          <button className="group bg-[#1a1a1a] text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#c9a962] transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10">About Us</span>
            <div className="absolute inset-0 bg-[#c9a962] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
