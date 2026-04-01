"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function DecorHeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ✅ FIXED & ORDERED ITEMS
  const items = [
    {
      src: "/momos.png",
      range: [0.1, 0.20],
      rotate: -5,
      className: "bottom-[45%] right-[17%] w-[16%] h-[26%]",
    },
    {
      src: "/momos2.png",
      range: [0.20, 0.25],
      rotate: -2,
      className: "bottom-[42%] right-[18%] w-[22%] h-[26%]",
    },
    {
      src: "/sushi.png",
      range: [0.25, 0.30],
      rotate: 10,
      className: "top-[30%] left-[15%] w-[26%] h-[30%]",
    },
    {
      src: "/rolls.png",
      range: [0.30, 0.35],
      rotate: 6,
      className: "top-[10%] left-[36%] w-[38%] h-[32%]",
    },
    {
      src: "/mit.png",
      range: [0.35, 0.40],
      rotate: -10,
      className: "top-[15%] left-[25%] w-[24%] h-[38%]",
    },
    {
      src: "/mit1.png",
      range: [0.40, 0.45],
      rotate: -10,
      className: "top-[20%] left-[30%] w-[21%] h-[38%]",
    },
    {
      src: "/noodles.png",
      range: [0.45, 0.50], // 👈 end exactly at 0.50
      rotate: -10,
      className: "bottom-[24%] left-[32%] w-[38%] h-[30%]",
    },
      {
      src: "/lamon.png",
      range: [0.50, 0.55], // 👈 end exactly at 0.50
      rotate: -8,
      className: "bottom-[38%] left-[40%] w-[8%] h-[7%]",
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-white overflow-visible">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">

        {/* LEFT TEXT */}
        <div className="absolute left-6 top-18 max-w-[290px] z-50">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">Since 2020</p>
          <h1 className="font-serif text-5xl text-[#1a1a1a] italic leading-tight mb-4">
            Banaya Decor
          </h1>
          <div className="w-8 h-[2px] bg-[#c8a96e] mb-4" />
          <p className="text-gray-500 text-xs leading-relaxed">
            Handcrafted wooden<br />serving platters for<br />modern dining.
          </p>
        </div>

        {/* RIGHT TEXT */}
        <div className="absolute right-6 bottom-8 max-w-[385px] text-right z-50">
          <p className="text-2xl uppercase tracking-[0.3em] text-gray-400 mb-3">Premium Quality</p>
          <p className="text-gray-600 text-xs leading-relaxed mb-4">
            Elevate every meal with our signature puzzle-fit tray collection.
          </p>
          <div className="ml-auto w-8 h-[2px] bg-[#c8a96e] mb-4" />
          <p className="text-lg text-gray-400 leading-relaxed">
            100% Acacia Wood<br />Food Safe Finish<br />Modular Design
          </p>
        </div>

        {/* 🪵 TRAY */}
        <div className="relative w-full max-w-[950px] aspect-[4/3]">

          <Image
            src="/Dish.png"
            alt="tray"
            fill
            priority
            className="object-contain scale-[1.2] "
          />

          {/* 🍜 ITEMS */}
          {items.map((item, index) => (
            <AnimatedItem
              key={index}
              src={item.src}
              progress={scrollYProgress}
              range={item.range}
              rotate={item.rotate}
              className={item.className}
              zIndex={index + 20}
            />
          ))}

          {/* 🥢 CHOPSTICKS */}
        </div>
      </div>
    </section>
  );
}

// 🍜 ITEM COMPONENT
function AnimatedItem({
  src,
  progress,
  range,
  rotate,
  className,
  zIndex,
}: {
  src: string;
  progress: import("framer-motion").MotionValue<number>;
  range: [number, number];
  rotate: number;
  className: string;
  zIndex: number;
}) {
  // ✅ Custom transform: once item appears (progress >= range[0]), it STAYS visible forever
  // opacity never goes back to 0 after it reaches 1
  const opacity = useTransform(progress, (v: number) => {
    if (v < range[0]) return 0;                                  // abhi aaya nahi
    if (v >= range[1]) return 1;                                 // aa gaya, lock at 1
    return (v - range[0]) / (range[1] - range[0]);              // fade in ho raha hai
  });

  const scale = useTransform(progress, (v: number) => {
    if (v < range[0]) return 0.85;
    if (v >= range[1]) return 1;
    const t = (v - range[0]) / (range[1] - range[0]);
    return 0.85 + t * 0.15;
  });

  const y = useTransform(progress, (v: number) => {
    if (v < range[0]) return 40;
    if (v >= range[1]) return 0;
    const t = (v - range[0]) / (range[1] - range[0]);
    return 40 - t * 40;
  });

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotate: `${rotate}deg`,
        zIndex, // 👈 important
        willChange: "transform, opacity",
      }}
      className={`absolute ${className}`}
    >
      <Image
        src={src}
        alt="food"
        fill
        className="object-contain drop-shadow-lg"
      />
    </motion.div>
  );
}

// 🥢 CHOPSTICKS COMPONENT
function Chopsticks({ progress }) {
  const opacity = useTransform(progress, [0.75, 0.9], [0, 1]);
  const x = useTransform(progress, [0.75, 0.9], [120, 0]);
  const rotate = useTransform(progress, [0.75, 0.9], [20, 0]);

  return (
    <motion.div
      style={{
        opacity,
        x,
        rotate,
      }}
      className="absolute right-[-12%] top-[18%] w-[32%] h-[50%] z-10"
    >
      <Image
        src="/Chopstick.png"
        alt="chopsticks"
        fill
        className="object-contain drop-shadow-2xl"
      />
    </motion.div>
  );
}