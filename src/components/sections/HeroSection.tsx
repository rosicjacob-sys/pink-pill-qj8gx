import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !overlayRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (overlayRef.current) {
            overlayRef.current.style.opacity = String(1 - p * 1.2);
            overlayRef.current.style.transform = `translateY(${p * 80}px)`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToBuy = () => {
    document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end pb-20 md:pb-24 overflow-hidden">
      {/* Canvas goes here via CapsuleScene in App */}

      {/* Content overlay */}
      <div ref={overlayRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-royal-pink font-mono mb-6" delay={0.6}>
            Daily Wellness
          </MaskedReveal>

          <MaskedReveal as="h1" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-[0.9] text-warm-black mb-8" delay={0.8}>
            <span className="text-royal-pink">The Pink One.</span>
            <br />
            Calm focus.
            <br />
            Zero crash.
          </MaskedReveal>

          <MaskedReveal className="text-lg md:text-xl text-muted/80 max-w-xl mb-10 font-body leading-relaxed" delay={1.2} stagger={0.012}>
            One capsule. Five clinically-studied ingredients. The clarity you've been chasing, without the jitters.
          </MaskedReveal>

          <div style={{ opacity: 0, animation: 'fadeIn 0.6s ease-out 1.8s forwards' }}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticElement>
                <button
                  onClick={scrollToBuy}
                  className="group relative px-10 py-4 bg-royal-pink text-pure-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,46,136,0.5)] hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Get The Pink One
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-pink via-royal-pink to-deep-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </MagneticElement>

              <div className="flex items-center gap-2 text-sm text-muted/70">
                <span className="text-royal-pink">★</span>
                <span className="font-semibold text-warm-black">4.9</span>
                <span>·</span>
                <span>12K+ reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6 text-xs text-muted/50">
              <span>Third-party tested</span>
              <span className="w-1 h-1 rounded-full bg-muted/30" />
              <span>Made in USA</span>
              <span className="w-1 h-1 rounded-full bg-muted/30" />
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-porcelain to-transparent pointer-events-none z-10" />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
        <div className="w-6 h-10 rounded-full border-2 border-warm-black/20 flex justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-royal-pink animate-bounce" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-mono">Scroll</span>
      </div>
    </section>
  );
}
