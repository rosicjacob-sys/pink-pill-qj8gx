import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Take one capsule',
    desc: 'With water, morning or early afternoon. The active forms absorb fast — no waiting, no guessing.',
    color: '#FF2E88',
  },
  {
    number: '02',
    title: 'Feel the shift',
    desc: 'Within 30 minutes: racing thoughts quiet, focus sharpens, edge softens. You\'re still you — just the version that works.',
    color: '#C4126B',
  },
  {
    number: '03',
    title: 'Stack the days',
    desc: 'Adaptogens build over time. By day 7, cortisol regulation is measurable. By day 30, it\'s your new baseline.',
    color: '#FF2E88',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
        });

        // Progress line fill
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'bottom bottom',
                scrub: 0.5,
              },
            }
          );
        }

        // Steps reveal
        const cards = sectionRef.current.querySelectorAll('.step-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 0.4,
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
              03 — How it works
            </MaskedReveal>
            <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-warm-black mb-6">
              Three steps.
              <br />
              <span className="text-royal-pink">One routine.</span>
            </MaskedReveal>
            <MaskedReveal className="text-lg text-muted">
              Fits into your morning. Feels like nothing at first — then everything feels easier.
            </MaskedReveal>
          </div>

          {/* Right: Steps */}
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-warm-black/10">
              <div
                ref={lineRef}
                className="w-full bg-royal-pink origin-top"
                style={{ height: '100%' }}
              />
            </div>

            <div className="space-y-20">
              {steps.map((step, i) => (
                <div key={i} className="step-card relative pl-20">
                  {/* Step dot */}
                  <div
                    className="absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-pure-white z-10"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}40` }}
                  />

                  <span
                    className="text-5xl md:text-7xl font-display font-black opacity-5 block leading-none"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-warm-black mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
