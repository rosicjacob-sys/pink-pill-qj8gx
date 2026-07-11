import { useEffect, useRef, createElement } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface MaskedRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  as?: 'div' | 'p' | 'h1' | 'h2' | 'span';
}

export default function MaskedReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.032,
  duration = 0.9,
  ease = 'power4.out',
  as: Tag = 'div',
}: MaskedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ran.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.opacity = '1'; return; }

    const chars = el.querySelectorAll('.reveal-char');
    const targets = chars.length > 0 ? chars : [el];

    const failsafe = setTimeout(() => { el.style.opacity = '1'; gsap.set(targets, { clearProps: 'all' }); }, 3500);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          clearTimeout(failsafe);
          gsap.fromTo(targets, { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration, stagger, delay, ease });
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el);
    return () => { obs.unobserve(el); clearTimeout(failsafe); };
  }, [stagger, duration, delay, ease]);

  return createElement(Tag, { ref, className, style: { opacity: 0 } }, children);
}
