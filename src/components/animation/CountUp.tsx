import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const [hasLanded, setHasLanded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            observer.unobserve(el);

            if (prefersReduced) {
              setDisplay(end);
              setHasLanded(true);
              return;
            }

            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = (now - startTime) / 1000;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * end;

              setDisplay(current);

              if (progress >= 1) {
                setDisplay(end);
                setHasLanded(true);
                return;
              }

              requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, [end, duration]);

  return (
    <div ref={ref} className={`count-up inline-block ${className} ${hasLanded ? 'landed' : ''}`}>
      <span className="font-mono tabular-nums">
        {prefix}
        {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
