import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticElement({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) return;

    const move = (e: MouseEvent) => {
      if (!boundsRef.current) return;
      const r = boundsRef.current;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const p = (1 - dist / radius) * strength;
        if (animRef.current) animRef.current.kill();
        animRef.current = gsap.to(el, { x: dx * p, y: dy * p, duration: 0.6, ease: 'power2.out' });
      }
    };
    const leave = () => {
      if (animRef.current) animRef.current.kill();
      animRef.current = gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };
    const enter = () => { boundsRef.current = el.getBoundingClientRect(); };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mouseenter', enter);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mouseenter', enter);
    };
  }, [strength, radius]);

  return <div ref={ref} className={className} style={{ display: 'inline-block' }}>{children}</div>;
}
