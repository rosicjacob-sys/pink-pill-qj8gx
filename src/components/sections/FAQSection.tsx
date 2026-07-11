import { useState, useRef } from 'react';
import gsap from 'gsap';
import MaskedReveal from '../animation/MaskedReveal';

const faqs = [
  { q: 'How fast will I feel it?', a: 'Most notice calmer focus within 30–60 minutes, thanks to L-Theanine\'s rapid absorption. Adaptogens build over 7–14 days for full stress-resilience.' },
  { q: 'Can I take it with medications?', a: 'Ingredients are GRAS at therapeutic doses. Always consult your physician before combining with prescription medications, especially SSRIs or MAOIs.' },
  { q: 'Is there caffeine in it?', a: 'Zero. The energy comes from mitochondrial support (Magnesium, B6, Zinc) — not stimulants. No jitters, no crash, no dependency.' },
  { q: 'What if it doesn\'t work?', a: '30-day money-back guarantee. If you don\'t love how you feel, we\'ll refund every dollar — no return necessary for your first bottle.' },
  { q: 'Is it third-party tested?', a: 'Every batch is tested by an ISO 17025 accredited lab for purity, potency, and contaminants. Certificates available on request.' },
  { q: 'Can I take more than one?', a: 'One capsule is calibrated for 24-hour coverage. Taking more doesn\'t increase benefits and may exceed safe upper limits.' },
  { q: 'Is the capsule vegetarian?', a: 'Yes — pullulan capsules (fermented tapioca), vegan, preservative-free, and oxygen-barrier protected for maximum potency.' },
  { q: 'Where is it made?', a: 'Manufactured in the United States in an FDA-registered, GMP-certified facility. Every batch ships with a certificate of analysis.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    if (open !== null && refs.current[open]) gsap.to(refs.current[open], { height: 0, duration: 0.25, ease: 'power2.inOut' });
    if (next !== null && refs.current[next]) {
      gsap.set(refs.current[next], { height: 'auto' });
      gsap.from(refs.current[next], { height: 0, duration: 0.35, ease: 'power3.out' });
    }
    setOpen(next);
  };

  return (
    <section className="relative py-28 md:py-40 bg-porcelain">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">FAQ</MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-warm-black">
            Everything you<br /><span className="text-royal-pink">need to know.</span>
          </MaskedReveal>
        </div>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-royal-pink/20">
              <button onClick={() => toggle(i)} className="w-full text-left p-5 flex items-center justify-between gap-4">
                <span className="font-semibold text-warm-black text-sm md:text-base pr-4">{faq.q}</span>
                <span className={`text-royal-pink shrink-0 transition-transform duration-300 text-xl ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div ref={(el) => { refs.current[i] = el; }} className="overflow-hidden" style={{ height: 0 }}>
                <div className="px-5 pb-5 text-muted/60 text-sm leading-relaxed">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
