import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';

interface MaskedRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  ease?: string;
}

export default function MaskedReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.032,
  duration = 0.9,
  direction = 'up',
  ease = 'power4.out',
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasRun.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      return;
    }

    const directionMap = {
      up: { y: '110%' },
      down: { y: '-110%' },
      left: { x: '110%' },
      right: { x: '-110%' },
    };

    const from = directionMap[direction];

    const lines = el.querySelectorAll('.reveal-line');
    const chars = el.querySelectorAll('.reveal-char');

    const targets = chars.length > 0 ? chars : lines.length > 0 ? lines : [el];

    // Wall-clock failsafe
    const failsafe = setTimeout(() => {
      if (el) {
        el.style.opacity = '1';
        gsap.set(targets, { clearProps: 'all' });
      }
    }, 3500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            clearTimeout(failsafe);

            gsap.fromTo(
              targets,
              { ...from, opacity: 0 },
              {
                ...Object.keys(from).reduce((acc, key) => ({ ...acc, [key]: '0%' }), {}),
                opacity: 1,
                duration,
                stagger,
                delay,
                ease,
              }
            );
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      clearTimeout(failsafe);
    };
  }, [stagger, duration, delay, ease, direction]);

  return (
    <Tag ref={containerRef} className={`masked-reveal ${className}`} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
