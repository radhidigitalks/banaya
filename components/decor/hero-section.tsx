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
    range: [0.15, 0.20],
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
    rotate: -16,
    className: "bottom-[20%] left-[30%] w-[38%] h-[40%]",
  },
];  

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center">

        {/* LEFT TEXT */}
        <div className="absolute left-10 max-w-sm">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] italic leading-tight">
            Banayaa <br /> Decor
          </h1>
        </div>

        {/* RIGHT TEXT */}
        <div className="absolute right-10 max-w-xs text-right">
          <p className="text-gray-600 text-lg leading-relaxed">
            Premium handcrafted trays designed to elevate your dining experience.
          </p>
        </div>

        {/* 🪵 TRAY */}
        <div className="relative w-full max-w-[950px] aspect-[4/3]">

          <Image
            src="/Dish.png"
            alt="tray"
            fill
            priority
            className="object-contain scale-[1.2]"
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
            />
          ))}

          {/* 🥢 CHOPSTICKS */}
          <Chopsticks progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

// 🍜 ITEM COMPONENT
function AnimatedItem({ src, progress, range, rotate, className }) {
  if (!range) return null; // safety

  const opacity = useTransform(progress, range, [0, 1]);
 const scale = useTransform(progress, range, [0.7, 1.1]);
  const y = useTransform(progress, range, [60, 0]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotate: `${rotate}deg`,
      }}
      className={`absolute ${className} z-20`}
    >
      <Image
        src={src}
        alt="food"
        fill
        className="object-contain drop-shadow-xl"
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