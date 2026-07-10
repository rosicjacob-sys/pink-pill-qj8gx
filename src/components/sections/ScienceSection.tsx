import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { name: 'L-Theanine', dosage: 200, unit: 'mg', desc: 'Amino acid for calm, focused alertness — found naturally in green tea. Promotes alpha brain waves without sedation.', color: '#FF2E88' },
  { name: 'Magnesium Glycinate', dosage: 150, unit: 'mg', desc: 'The relaxation mineral in its most bioavailable form. Supports muscle recovery and sleep quality.', color: '#C4126B' },
  { name: 'Ashwagandha KSM-66', dosage: 300, unit: 'mg', desc: 'Clinically studied adaptogen that lowers cortisol by up to 27%. Full-spectrum root extract, never leaves.', color: '#FF2E88' },
  { name: 'Vitamin B6 (P-5-P)', dosage: 10, unit: 'mg', desc: 'Active coenzyme form that crosses the blood-brain barrier. Supports neurotransmitter synthesis directly.', color: '#C4126B' },
  { name: 'Zinc Picolinate', dosage: 15, unit: 'mg', desc: 'Highest-absorption zinc chelate. Essential cofactor for over 300 enzymatic reactions.', color: '#FF2E88' },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        // Pin the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
        });

        // Parallax background
        gsap.to('.science-bg-gradient', {
          scale: 1.2,
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        });

        // Cards stagger
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.ingredient-card');
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { x: i % 2 === 0 ? -100 : 100, opacity: 0, rotateY: i % 2 === 0 ? 15 : -15 },
              {
                x: 0,
                opacity: 1,
                rotateY: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  end: 'top 40%',
                  scrub: 0.4,
                },
              }
            );
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-porcelain">
      {/* Background gradient */}
      <div className="science-bg-gradient absolute inset-0 bg-gradient-to-br from-royal-pink/5 via-transparent to-deep-pink/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Section header */}
        <div className="text-center mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
            02 — The Science
          </MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black mb-6">
            Five ingredients.
            <br />
            <span className="text-royal-pink">Zero compromises.</span>
          </MaskedReveal>
          <MaskedReveal className="text-lg text-muted max-w-2xl mx-auto">
            Each compound was selected for clinical evidence, not marketing. Therapeutic doses. Active forms. Real results.
          </MaskedReveal>
        </div>

        {/* Ingredient cards */}
        <div ref={cardsRef} className="space-y-8 md:space-y-12">
          {ingredients.map((ingredient, i) => (
            <div
              key={i}
              className="ingredient-card group relative bg-pure-white rounded-3xl p-8 md:p-12 border border-warm-black/5 transition-shadow duration-500 hover:shadow-[0_20px_80px_rgba(255,46,136,0.08)]"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Number + Name */}
                <div className="flex items-center gap-6 md:w-64 shrink-0">
                  <span
                    className="text-5xl md:text-6xl font-display font-black opacity-10"
                    style={{ color: ingredient.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-warm-black">
                      {ingredient.name}
                    </h3>
                  </div>
                </div>

                {/* Dosage */}
                <div className="md:w-48 shrink-0">
                  <CountUp
                    end={ingredient.dosage}
                    suffix={` ${ingredient.unit}`}
                    className="text-3xl md:text-4xl font-mono font-bold text-royal-pink"
                  />
                  <p className="text-xs text-muted mt-1 tracking-wider uppercase">Per capsule</p>
                </div>

                {/* Description */}
                <p className="text-muted leading-relaxed flex-1">
                  {ingredient.desc}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 rounded-full bg-warm-black/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 group-hover:w-full"
                  style={{
                    width: `${(ingredient.dosage / 300) * 100}%`,
                    background: `linear-gradient(90deg, ${ingredient.color} 0%, ${ingredient.color}88 100%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
