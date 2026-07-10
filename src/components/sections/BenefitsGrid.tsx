import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: '🧠',
    title: 'Calm Focus',
    desc: 'Alpha-wave brain state without sedation. Think clearly under pressure.',
    stat: '94%',
    statLabel: 'reported improved focus',
  },
  {
    icon: '⚡',
    title: 'Clean Energy',
    desc: 'No caffeine, no crash. Mitochondrial support that lasts all day.',
    stat: '89%',
    statLabel: 'replaced their afternoon coffee',
  },
  {
    icon: '😌',
    title: 'Stress Resilience',
    desc: 'Cortisol down 27% in clinical trials. You still feel stress — it just doesn\'t run you.',
    stat: '27%',
    statLabel: 'cortisol reduction',
  },
  {
    icon: '🌙',
    title: 'Better Sleep',
    desc: 'Falls asleep faster, stays asleep deeper. Wake up without the grog.',
    stat: '91%',
    statLabel: 'improved sleep quality',
  },
  {
    icon: '🏃',
    title: 'Faster Recovery',
    desc: 'Magnesium + Zinc support muscle repair and reduce next-day soreness.',
    stat: '86%',
    statLabel: 'faster workout recovery',
  },
  {
    icon: '🎯',
    title: 'Mood Balance',
    desc: 'Neurotransmitter precursors that support dopamine and serotonin naturally.',
    stat: '93%',
    statLabel: 'reported better mood',
  },
];

export default function BenefitsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.benefit-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.3,
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
            05 — Benefits
          </MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black">
            Everything changes
            <br />
            <span className="text-royal-pink">when your brain works.</span>
          </MaskedReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card group relative bg-porcelain rounded-3xl p-8 md:p-10 border border-warm-black/5 transition-all duration-500 hover:border-royal-pink/20 hover:shadow-[0_20px_60px_rgba(255,46,136,0.06)] hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-display font-bold text-warm-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {benefit.desc}
              </p>
              <div className="pt-4 border-t border-warm-black/5">
                <div className="text-3xl font-mono font-bold text-royal-pink">
                  {benefit.stat}
                </div>
                <p className="text-xs text-muted mt-1">{benefit.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
