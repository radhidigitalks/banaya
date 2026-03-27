"use client";

import { useState, useRef, useEffect } from "react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    category: "Living Room",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    category: "Bedroom",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Courtyards",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    category: "Kitchen",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Wardrobe",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Dining",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    category: "Study",
  },
];

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const itemWidth = 320;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setActiveIndex(Math.min(newIndex + 2, galleryImages.length - 1));
      }
    };

    const ref = scrollRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-24 bg-white">
      {/* Header */}
      <div className="text-center mb-16 px-8">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] tracking-[0.1em]">
          Objects of Desire
        </h2>
      </div>

      {/* Gallery Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-8 pb-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`flex-shrink-0 transition-all duration-500 ${
              index === activeIndex
                ? "w-80 md:w-96 h-[450px] md:h-[550px] ring-2 ring-[#e87d3e]/50"
                : "w-64 md:w-72 h-[350px] md:h-[400px]"
            }`}
            style={{ scrollSnapAlign: "center" }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative w-full h-full overflow-hidden cursor-pointer">
              <img
                src={image.src}
                alt={image.category}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Category Label */}
      <div className="text-center mt-8">
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {galleryImages[activeIndex]?.category}
        </span>
        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-[#1a1a1a]" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
