"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScroll, destroyScroll } from "./scroll-controller";

gsap.registerPlugin(ScrollTrigger);

const FoodCanvas = dynamic(() => import("./food-canvas"), { ssr: false });

const FEATURES = [
  "Handcrafted wooden pieces",
  "100% natural · Scratch-proof · Food-safe",
  "Perfect for homes, restaurants & cafés",
];

const SECTIONS = [
  {
    label: "Banayaa Decor",
    heading: ["Crafted", "with Soul"],
    sub: "Where every piece tells a story of artisanship and natural beauty.",
  },
  {
    label: "Our Philosophy",
    heading: ["Wood that", "Whispers"],
    sub: "Sustainably sourced timber, shaped by hands that have perfected the craft over generations.",
  },
  {
    label: "The Collection",
    heading: ["Objects of", "Desire"],
    sub: "Serving platters, bowls, trays — each piece a conversation starter on your table.",
  },
];

export function DecorHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Lenis + GSAP ScrollTrigger ──────────────────────────────────────────────
  useEffect(() => {
    const lenis = initScroll();

    const container = containerRef.current;
    if (!container) return;

    // overall scroll progress → drives camera
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    // canvas sticky
    if (canvasWrapRef.current) {
      gsap.set(canvasWrapRef.current, { position: "sticky", top: 0 });
    }

    // per-section text animations
    textRefs.current.forEach((el, i) => {
      if (!el) return;

      const heading = el.querySelectorAll(".anim-heading span");
      const sub = el.querySelector(".anim-sub");
      const label = el.querySelector(".anim-label");
      const dots = el.querySelectorAll(".anim-dot");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.8,
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
        },
      });

      tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(heading, { opacity: 0, y: 60, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: 0.15, duration: 0.6 }, "-=0.2")
        .fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(dots, { scale: 0 }, { scale: 1, stagger: 0.1, duration: 0.3 }, "-=0.3");

      // exit animation
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "bottom 60%",
          end: "bottom 10%",
          scrub: 0.6,
        },
        opacity: 0,
        y: -40,
      });
    });

    return () => destroyScroll();
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${SECTIONS.length * 100}vh` }}>

      {/* ── Sticky Canvas ─────────────────────────────────────────────────── */}
      <div
        ref={canvasWrapRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#faf8f4]"
        style={{ zIndex: 0 }}
      >
        {/* subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

        {/* 3D Canvas — full screen */}
        <div className="absolute inset-0">
          <FoodCanvas scrollProgress={scrollProgress} mouse={mouse} />
        </div>

        {/* scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${scrollProgress > 0.05 ? "opacity-0" : "opacity-100"}`}>
          <span className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a962] to-transparent animate-pulse" />
        </div>

        {/* section counter */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2">
          {SECTIONS.map((_, i) => (
            <div key={i} className={`w-1 rounded-full transition-all duration-500 ${activeSection === i ? "h-8 bg-[#c9a962]" : "h-2 bg-[#1a1a1a]/20"}`} />
          ))}
        </div>
      </div>

      {/* ── Scroll Sections (text overlaid) ───────────────────────────────── */}
      {SECTIONS.map((sec, i) => (
        <div
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          className="absolute w-full flex items-center pointer-events-none"
          style={{ top: `${i * 100}vh`, height: "100vh", zIndex: 10 }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* text panel */}
            <div className="flex flex-col justify-center py-16 lg:py-0">
              {/* label */}
              <div className="anim-label mb-6 flex items-center gap-3 opacity-0">
                <div className="w-8 h-px bg-[#c9a962]" />
                <span className="text-[10px] tracking-[0.35em] text-[#c9a962] uppercase font-medium">
                  {sec.label}
                </span>
              </div>

              {/* heading */}
              <div className="anim-heading overflow-hidden mb-6">
                {sec.heading.map((line, j) => (
                  <div key={j} className="overflow-hidden">
                    <span className="block font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#1a1a1a] leading-[1.0] opacity-0"
                      style={{ fontStyle: j === 1 ? "italic" : "normal" }}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* sub */}
              <p className="anim-sub text-sm md:text-base text-[#1a1a1a]/60 max-w-sm leading-relaxed mb-8 opacity-0">
                {sec.sub}
              </p>

              {/* feature dots — only first section */}
              {i === 0 && (
                <div className="space-y-3">
                  {FEATURES.map((f, fi) => (
                    <div key={fi} className="anim-dot flex items-center gap-3 opacity-0 scale-0">
                      <span className="w-2 h-2 rounded-full bg-[#e87d3e] flex-shrink-0" />
                      <span className="text-sm text-[#1a1a1a]/70">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA — last section */}
              {i === SECTIONS.length - 1 && (
                <div className="anim-dot opacity-0 scale-0 pointer-events-auto">
                  <button className="mt-2 bg-[#1a1a1a] text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#c9a962] transition-colors duration-300">
                    Shop Collection
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ── Parallax background word ───────────────────────────────────────── */}
      <div
        className="sticky bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1, marginTop: `-${SECTIONS.length * 100}vh` }}
      >
        <div
          className="font-serif text-[18vw] text-[#1a1a1a]/[0.025] leading-none select-none whitespace-nowrap"
          style={{ transform: `translateX(${-scrollProgress * 30}%)` }}
        >
          BANAYAA DECOR
        </div>
      </div>
    </div>
  );
}
