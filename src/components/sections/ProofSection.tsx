import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Sarah M.',
    role: 'Product Designer',
    stars: 5,
    text: 'I was skeptical about another supplement. Two weeks in, I noticed I wasn\'t reaching for my 3pm coffee anymore. The focus is different — it\'s calm, not wired. Game changer.',
    initials: 'SM',
  },
  {
    name: 'James K.',
    role: 'Software Engineer',
    stars: 5,
    text: 'My stack used to be 4 different bottles. Now it\'s one. My blood work improved, my sleep tracker looks better, and I save $60/month. Can\'t argue with the numbers.',
    initials: 'JK',
  },
  {
    name: 'Dr. Lisa R.',
    role: 'Clinical Psychologist',
    stars: 5,
    text: 'I recommend The Pink One to patients who need cognitive support without the side effects of stimulants. The ingredient transparency is what sold me — every dose is therapeutic.',
    initials: 'LR',
  },
];

const stats = [
  { end: 12500, suffix: '+', label: 'Daily users' },
  { end: 4200, suffix: '', label: '5-star reviews' },
  { end: 30, suffix: ' days', label: 'Money-back guarantee' },
  { end: 98, suffix: '%', label: 'Subscription retention' },
];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    mm.add('(min-width: 800px)', () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.review-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, rotateX: 5 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-porcelain overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-pink/3 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
            06 — Proof
          </MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black">
            Don't take our
            <br />
            <span className="text-royal-pink">word for it.</span>
          </MaskedReveal>
        </div>

        {/* Odometer stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-royal-pink"
              />
              <p className="text-sm text-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="review-card bg-pure-white rounded-3xl p-8 md:p-10 border border-warm-black/5 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(26,10,20,0.06)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, s) => (
                  <span key={s} className="text-royal-pink text-lg">★</span>
                ))}
              </div>

              <p className="text-muted leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-warm-black/5">
                <div className="w-10 h-10 rounded-full bg-royal-pink/10 flex items-center justify-center text-royal-pink font-bold text-sm">
                  {review.initials}
                </div>
                <div>
                  <div className="font-semibold text-warm-black text-sm">{review.name}</div>
                  <div className="text-xs text-muted">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
