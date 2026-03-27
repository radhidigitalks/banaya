"use client";

import { useState } from "react";

const services = [
  {
    id: "full-home",
    title: "Full Home Interior",
    description: "Complete estimation journey with a structured and accurate questionnaire.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    available: true,
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Smart modular kitchen estimator will be released soon.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    available: false,
  },
  {
    id: "wardrobe",
    title: "Wardrobe",
    description: "Wardrobe estimation flow is currently in progress.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    available: false,
  },
];

export function ServicesSection() {
  const [activeWord, setActiveWord] = useState("Kitchen");

  return (
    <section className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-4">
            Get the estimate for your
          </h2>
          <div className="relative h-16 overflow-hidden">
            <span className="font-serif text-4xl md:text-5xl text-muted-foreground/30 italic">
              {activeWord}
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-4">
            Select a service and receive a detailed estimate by email. Minimal interface, smart logic, and no guesswork.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative"
              onMouseEnter={() => setActiveWord(service.title)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!service.available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-[#1a1a1a]/80 text-white px-4 py-2 text-xs tracking-[0.15em] uppercase">
                      Locked - Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Button */}
              <button
                className={`w-full py-3 text-xs tracking-[0.15em] uppercase border transition-colors ${
                  service.available
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#c9a962] hover:border-[#c9a962]"
                    : "bg-white text-muted-foreground border-border cursor-not-allowed"
                }`}
                disabled={!service.available}
              >
                {service.available ? "Calculate" : "Coming Soon"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
