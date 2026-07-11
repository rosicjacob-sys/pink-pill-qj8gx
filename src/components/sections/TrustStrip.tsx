import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = ['Forbes', 'Well+Good', 'MindBodyGreen', 'Goop', 'Shape', "Women's Health", "Men's Health", 'The Cut', 'Byrdie', 'PopSugar', 'Vogue', 'Allure', 'Self', 'Verywell', 'Healthline'];

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
    tl.to(track, { x: '-50%', duration: 35 });
    tl.to(clone, { x: '-50%', duration: 35 }, 0);
    return () => { tl.kill(); clone.remove(); };
  }, []);

  return (
    <section className="relative py-10 bg-pure-white overflow-hidden border-y border-warm-black/[0.04]">
      <div className="relative overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div ref={trackRef} className="flex gap-14 md:gap-20 items-center px-8">
            {logos.map((logo, i) => (
              <span key={i} className="text-xl md:text-2xl font-display font-bold text-warm-black/[0.08] hover:text-royal-pink/30 transition-colors duration-700 select-none">
                {logo}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-pure-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-pure-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
