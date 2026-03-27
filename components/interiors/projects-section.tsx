"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Niseko Dining House",
    location: "Hokkaido, Japan",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80",
  },
  {
    id: 2,
    title: "Urban Loft Studio",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    id: 3,
    title: "Coastal Retreat",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
  },
  {
    id: 4,
    title: "Mountain Villa",
    location: "Shimla, India",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
];

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-3">
            <h2 className="text-xs tracking-[0.2em] text-[#c9a962] uppercase mb-4">
              Our Projects
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quietly luxurious spaces where bespoke furniture, light, and material come together to define the way you live.
            </p>
          </div>

          {/* Center Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Info */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <span className="text-sm text-muted-foreground">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>

              <div>
                <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  Featured Project
                </span>
                <h3 className="font-serif text-xl text-[#1a1a1a] mt-1">
                  {currentProject.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentProject.location}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#1a1a1a] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#1a1a1a] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
