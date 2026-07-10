import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFinished = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxDuration = prefersReduced ? 100 : 2500;

    // Simulate asset loading progress
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const simulatedLoad = Math.min(elapsed / maxDuration, 1);
      const eased = 1 - Math.pow(1 - simulatedLoad, 3);
      setProgress(Math.round(eased * 100));
    }, 30);

    // Hard wall-clock cap
    const failsafe = setTimeout(() => {
      if (!hasFinished.current) {
        setProgress(100);
        finishUp();
      }
    }, maxDuration + 500);

    const finishUp = () => {
      if (hasFinished.current) return;
      hasFinished.current = true;
      clearInterval(interval);
      clearTimeout(failsafe);

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      }
    };

    // Auto-finish when simulated load is done
    const checkDone = setInterval(() => {
      if (progress >= 100 && !hasFinished.current) {
        finishUp();
        clearInterval(checkDone);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(checkDone);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-plum"
    >
      <div className="text-center">
        <div className="text-7xl md:text-9xl font-display font-black text-royal-pink mb-8">
          {progress}
          <span className="text-3xl md:text-5xl">%</span>
        </div>
        <div className="w-64 h-1 bg-plum/50 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-royal-pink rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted mt-6 text-sm tracking-widest uppercase font-mono">
          Loading the pink
        </p>
      </div>
    </div>
  );
}
