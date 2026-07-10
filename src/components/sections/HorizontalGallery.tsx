import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: 'Morning Clarity', subtitle: 'Start sharp', gradient: 'from-royal-pink/20 to-deep-pink/10' },
  { title: 'Afternoon Reset', subtitle: 'No crash', gradient: 'from-deep-pink/20 to-royal-pink/10' },
  { title: 'Evening Calm', subtitle: 'Wind down natural', gradient: 'from-royal-pink/20 to-plum/5' },
  { title: 'Deep Focus', subtitle: 'Flow state unlocked', gradient: 'from-plum/10 to-royal-pink/20' },
  { title: 'Stress Shield', subtitle: 'Cortisol controlled', gradient: 'from-royal-pink/20 to-deep-pink/20' },
  { title: 'Sleep Support', subtitle: 'Wake refreshed', gradient: 'from-deep-pink/20 to-plum/10' },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const scrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${scrollWidth}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-porcelain">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-8 md:gap-16 px-6 lg:px-12 shrink-0">
          {/* Intro card */}
          <div className="w-[80vw] md:w-[500px] shrink-0 flex flex-col justify-center">
            <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
              04 — The Experience
            </MaskedReveal>
            <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-none text-warm-black mb-6">
              How it
              <br />
              <span className="text-royal-pink">actually feels.</span>
            </MaskedReveal>
            <MaskedReveal className="text-lg text-muted">
              Not clinical descriptions. Real experiences from real days. Swipe through the states.
            </MaskedReveal>
          </div>

          {/* Gallery cards */}
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="w-[70vw] md:w-[400px] shrink-0 relative rounded-3xl overflow-hidden border border-warm-black/5 group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

              {/* Pill illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, #FF2E88 0%, #C4126B 100%)',
                    boxShadow: '0 0 80px rgba(255, 46, 136, 0.3)',
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                <p className="text-xs tracking-wider uppercase text-royal-pink/70 font-mono mb-2">
                  0{i + 1}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-warm-black mb-2">
                  {item.title}
                </h3>
                <p className="text-muted">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
