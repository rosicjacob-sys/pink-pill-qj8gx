import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { name: 'L-Theanine', dosage: 200, unit: 'mg', desc: 'Found naturally in green tea. Promotes alpha brain waves — calm, alert, focused. Zero sedation.', color: '#FF2E88', detail: 'Clinically studied at 200mg' },
  { name: 'Magnesium Glycinate', dosage: 150, unit: 'mg', desc: 'The relaxation mineral. Most bioavailable form. Supports sleep, muscle recovery, and nerve function.', color: '#C4126B', detail: 'Chelated for max absorption' },
  { name: 'Ashwagandha KSM-66', dosage: 300, unit: 'mg', desc: 'Full-spectrum adaptogen proven to lower cortisol 27%. Root extract only — never leaves.', color: '#FF2E88', detail: 'Gold standard extract' },
  { name: 'Vitamin B6 (P-5-P)', dosage: 10, unit: 'mg', desc: 'Active coenzyme form. Crosses blood-brain barrier. Essential for neurotransmitter synthesis.', color: '#C4126B', detail: 'Not synthetic pyridoxine' },
  { name: 'Zinc Picolinate', dosage: 15, unit: 'mg', desc: 'Highest bioavailability zinc. Cofactor for 300+ enzymes. Supports immunity and cognition.', color: '#FF2E88', detail: 'Chelated absorption' },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width:800px) and (prefers-reduced-motion:no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.ing-card');
        cards?.forEach((card, i) => {
          gsap.fromTo(card, { y: 60, opacity: 0, rotateX: 3 }, {
            y: 0, opacity: 1, rotateX: 0, duration: 0.7, delay: i * 0.08,
            ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 60%', scrub: 0.2 },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 bg-porcelain overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-royal-pink/[0.02] rounded-full blur-[160px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">The formula</MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black">
            Therapeutic doses.
            <br /><span className="text-royal-pink">No fairy dust.</span>
          </MaskedReveal>
        </div>

        <div className="space-y-4 md:space-y-5">
          {ingredients.map((ing, i) => (
            <div key={i} className="ing-card glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-500 hover:bg-white/20 hover:border-royal-pink/20 hover:shadow-[0_12px_40px_rgba(255,46,136,0.06)]">
              <div className="flex items-center gap-4 md:w-56 shrink-0">
                <span className="text-5xl font-display font-black opacity-[0.07]" style={{ color: ing.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-warm-black">{ing.name}</h3>
                  <p className="text-[11px] text-muted/50 mt-0.5">{ing.detail}</p>
                </div>
              </div>
              <div className="md:w-40 shrink-0">
                <CountUp end={ing.dosage} suffix={` ${ing.unit}`} className="text-2xl md:text-3xl font-mono font-bold text-royal-pink" />
                <p className="text-[10px] text-muted/40 mt-0.5 tracking-wider uppercase">Per capsule</p>
              </div>
              <p className="text-muted/70 leading-relaxed flex-1 text-sm md:text-base">{ing.desc}</p>
              <div className="h-1.5 rounded-full bg-warm-black/[0.04] w-24 shrink-0 hidden lg:block">
                <div className="h-full rounded-full" style={{ width: `${(ing.dosage / 300) * 100}%`, background: `linear-gradient(90deg, ${ing.color}, ${ing.color}88)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
