import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let velocity = 0;
let rafId: number | null = null;

export function initScroll() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  const raf = (time: number) => {
    if (!lenisInstance) return;
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  gsap.ticker.add((time) => {
    if (lenisInstance) lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  if (lenisInstance) {
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
      const v = lenisInstance!.velocity;
      velocity += (v - velocity) * 0.1;
    });
  }

  window.addEventListener('scroll', () => {
    ScrollTrigger.update();
  }, { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenisInstance.stop();
  }

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function getVelocity() {
  return velocity;
}

export function destroyScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
