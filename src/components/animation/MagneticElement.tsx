import { useRef, useEffect } from 'react';
import type { ReactNode, ElementType } from 'react';
import gsap from 'gsap';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: ElementType;
}

export default function MagneticElement({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
  as: Tag = 'div',
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

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundsRef.current) return;
      const rect = boundsRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        const power = (1 - dist / radius) * strength;
        const moveX = distX * power;
        const moveY = distY * power;

        if (animRef.current) animRef.current.kill();
        animRef.current = gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (animRef.current) animRef.current.kill();
      animRef.current = gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const handleMouseEnter = () => {
      boundsRef.current = el.getBoundingClientRect();
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength, radius]);

  return (
    <Tag ref={ref} className={`magnetic-element ${className}`} style={{ display: 'inline-block' }}>
      {children}
    </Tag>
  );
}
