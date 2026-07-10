import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MaskedReveal from '../animation/MaskedReveal';

const logos = [
  'Forbes', 'Well+Good', 'MindBodyGreen', 'Goop', 'Shape', 'Women\'s Health',
  'Men\'s Health', 'The Cut', 'Byrdie', 'PopSugar',
];

export default function TrustStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const track = trackRef.current;
    const clone = track.cloneNode(true) as HTMLDivElement;
    track.parentElement?.appendChild(clone);

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
    tl.to(track, { x: '-50%', duration: 30 });
    tl.to(clone, { x: '-50%', duration: 30 }, 0);

    return () => {
      tl.kill();
      if (clone.parentElement) clone.parentElement.removeChild(clone);
    };
  }, []);

  return (
    <section className="relative py-16 bg-pure-white overflow-hidden border-y border-warm-black/5">
      <MaskedReveal className="text-center mb-10">
        <p className="text-xs tracking-[0.25em] uppercase text-muted font-mono">As seen in</p>
      </MaskedReveal>

      <div className="relative overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div ref={trackRef} className="flex gap-16 md:gap-24 items-center px-8">
            {logos.map((logo, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl font-display font-bold text-warm-black/15 hover:text-royal-pink/40 transition-colors duration-500"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-pure-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pure-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
