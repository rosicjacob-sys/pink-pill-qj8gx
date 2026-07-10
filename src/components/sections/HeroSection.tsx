import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        // Pill floating animation
        if (pillRef.current) {
          gsap.to(pillRef.current, {
            y: -30,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Glow pulse
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            scale: 1.2,
            opacity: 0.6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Parallax on scroll
        if (sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              const progress = self.progress;
              if (pillRef.current) {
                gsap.set(pillRef.current, {
                  y: -30 + progress * 120,
                  scale: 1 - progress * 0.15,
                  opacity: 1 - progress * 0.5,
                });
              }
              if (glowRef.current) {
                gsap.set(glowRef.current, {
                  scale: 1.2 + progress * 0.8,
                  opacity: 0.6 - progress * 0.3,
                });
              }
            },
          });
        }

        // Stars twinkle
        if (starsRef.current) {
          const stars = starsRef.current.querySelectorAll('.star');
          stars.forEach((star, i) => {
            gsap.to(star, {
              opacity: 0.3,
              duration: 1 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              delay: i * 0.1,
              ease: 'sine.inOut',
            });
          });
        }

        // Stats slide in
        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll('.stat-item'),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              delay: 2.2,
              ease: 'power3.out',
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const scrollToBuy = () => {
    const buyBlock = document.getElementById('buy-block');
    if (buyBlock) {
      buyBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-porcelain"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-porcelain via-pure-white to-porcelain" />

      {/* Animated stars background */}
      <div ref={starsRef} className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-royal-pink/10"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Pill glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
        style={{
          background: 'radial-gradient(circle, #FF2E88 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* The Pill - CSS 3D pill */}
      <div ref={pillRef} className="relative z-10 mb-12" style={{ perspective: '1000px' }}>
        <div
          className="relative w-40 h-40 md:w-56 md:h-56"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'spin 20s linear infinite',
          }}
        >
          {/* Pill body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF2E88 0%, #C4126B 50%, #FF2E88 100%)',
              boxShadow: '0 0 60px rgba(255, 46, 136, 0.5), 0 0 120px rgba(255, 46, 136, 0.25), 0 20px 60px rgba(26, 10, 20, 0.2), inset 0 -8px 20px rgba(0, 0, 0, 0.15)',
            }}
          />
          {/* Pill gloss highlight */}
          <div
            className="absolute rounded-full"
            style={{
              top: '15%',
              left: '20%',
              width: '40%',
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: '50%',
            }}
          />
          {/* Pill specular dot */}
          <div
            className="absolute rounded-full bg-pure-white"
            style={{
              top: '20%',
              left: '45%',
              width: '12%',
              height: '8%',
              opacity: 0.8,
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <MaskedReveal as="h1" className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-none text-warm-black mb-6" delay={0.8}>
          <span className="text-royal-pink">The Pink One.</span>
          <br />
          <span className="text-warm-black">Your Daily</span>
          <br />
          <span className="text-warm-black">Reset Button.</span>
        </MaskedReveal>

        <MaskedReveal className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 font-body" delay={1.4} stagger={0.015}>
          One capsule. Calm focus. Clean energy. No crash, no jitters — just the clarity you've been missing.
        </MaskedReveal>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <MagneticElement>
            <button
              onClick={scrollToBuy}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-royal-pink text-pure-white font-bold text-lg rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,46,136,0.5)]"
              style={{ opacity: 0, animation: 'fadeIn 0.6s ease-out 2s forwards' }}
            >
              <span className="relative z-10">Get The Pink One</span>
              <span className="relative z-10 text-xl">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-deep-pink to-royal-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </MagneticElement>
        </div>
      </div>

      {/* Trust micro-row */}
      <div ref={statsRef} className="relative z-10 flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 pb-16 text-sm text-muted">
        <div className="stat-item flex items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-royal-pink text-xl">★</span>
          <span className="font-bold text-warm-black">4.9</span>
          <span>12,000+ reviews</span>
        </div>
        <div className="stat-item flex items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-royal-pink">✓</span>
          <span>Third-party tested</span>
        </div>
        <div className="stat-item flex items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-royal-pink">🇺🇸</span>
          <span>Made in USA</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="w-6 h-10 rounded-full border-2 border-warm-black/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-royal-pink animate-bounce" />
          </div>
          <span className="text-xs text-muted tracking-widest uppercase font-mono">Scroll</span>
        </div>
      </div>
    </section>
  );
}
