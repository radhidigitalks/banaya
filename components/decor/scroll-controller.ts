import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initScroll(): Lenis {
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyScroll() {
  lenisInstance?.destroy();
  lenisInstance = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export function getScrollProgress(
  trigger: Element,
  onUpdate: (progress: number) => void
) {
  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => onUpdate(self.progress),
  });
}
