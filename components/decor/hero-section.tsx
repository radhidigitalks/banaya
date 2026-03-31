"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function DecorHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  const totalSteps = 12;

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      let currentStep = Math.floor(scrollY / (screenHeight * 0.6));

      if (currentStep >= totalSteps) currentStep = totalSteps - 1;

      setStep(currentStep);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisibleImg = (boxIndex: number, imgIndex: number) => {
    return step >= boxIndex * 3 + imgIndex;
  };

  return (
    <section className="relative h-[800vh] bg-white">
      <div className="sticky top-0 min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT CONTENT (UNCHANGED) */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Banayaa Decor
            </span>
          </div>

          <div
            className={`mt-6 transition-all duration-1000 ${
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
            className={`mt-8 space-y-3 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              "Handcrafted wooden pieces",
              "100% natural | Scratch-proof | Long-lasting | Food-safe",
              "Perfect for homes, restaurants & cafés",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e87d3e]" />
                <span className="text-sm text-[#1a1a1a]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center bg-[#fafaf8]">

          {/* BIGGER PLATE */}
          <div className="relative w-[650px] h-[650px]">

            {/* Plate */}
            <Image
              src="/Dish.png"
              alt="plate"
              fill
              className="object-contain z-10"
              priority
            />

            {/* GRID OVERLAY (aligned & bigger) */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-6 p-20">

              {[0, 1, 2, 3].map((box) => (
                <div key={box} className="relative">

                  {[0, 1, 2].map((img) => (
                    <Image
                      key={img}
                      src={`/box${box + 1}-${img + 1}.png`}
                      alt="food"
                      fill
                      className={`object-contain transition-all duration-700 ${
                        isVisibleImg(box, img)
                          ? "opacity-100 scale-110"
                          : "opacity-0 scale-75"
                      }`}
                    />
                  ))}

                </div>
              ))}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}