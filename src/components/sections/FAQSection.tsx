import { useState, useRef } from 'react';
import gsap from 'gsap';
import MaskedReveal from '../animation/MaskedReveal';

const faqs = [
  { q: 'What is GHK-Cu?', a: 'GHK-Cu (Copper Tripeptide-1) is a naturally occurring copper-peptide complex. It is present in human plasma at ~200 ng/mL at age 20 but drops approximately 60% by age 60. It functions as a matrikine — a signaling peptide released during tissue injury that activates regeneration cascades.' },
  { q: 'How does it work at the cellular level?', a: 'GHK-Cu binds to the copper transporter CTR1 on cell surfaces. Once internalized, the copper ion activates lysyl oxidase for collagen cross-linking, while the GHK tripeptide upregulates over 50 genes associated with DNA repair, antioxidant defense, and extracellular matrix remodeling.' },
  { q: 'How do I use lyophilized powder?', a: 'Reconstitute 200mg of powder with 5mL of bacteriostatic water. The resulting solution (40mg/mL) can be applied topically to clean skin, ideally after microneedling or dermaplaning. Store reconstituted solution at 4°C and use within 30 days.' },
  { q: 'Is this the same as skincare peptides?', a: 'Cosmetic peptides in serums are typically present at 0.01–1% concentrations with limited stability. This is pharmaceutical-grade lyophilized GHK-Cu — freeze-dried for maximum stability, reconstituted fresh, and applied at therapeutic concentrations supported by clinical literature.' },
  { q: 'How pure is it?', a: '≥99.2% as verified by HPLC-MS. Every batch ships with a certificate of analysis showing purity, copper content, endotoxin levels, and absence of residual solvents. Full transparency, always.' },
  { q: 'Are there side effects?', a: 'GHK-Cu is exceptionally well-tolerated. Copper ions at this concentration are within physiological ranges. Some users report a transient copper taste sensation — this is benign and indicates systemic absorption. Always patch-test first.' },
  { q: 'How fast are results visible?', a: 'Most users report improved skin texture and reduced redness within 2 weeks. Collagen remodeling becomes visible at 4–6 weeks. Peak results at 12 weeks with consistent use. This is regeneration, not cosmetic coverage.' },
  { q: 'Why lyophilized powder instead of pre-mixed?', a: 'GHK-Cu in solution degrades within weeks. Lyophilization preserves the peptide at full potency for 2+ years at −20°C. You reconstitute exactly what you need, when you need it. No preservatives, no degradation products.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    if (open !== null && refs.current[open]) gsap.to(refs.current[open], { height: 0, duration: 0.25, ease: 'power2.inOut' });
    if (next !== null && refs.current[next]) { gsap.set(refs.current[next], { height: 'auto' }); gsap.from(refs.current[next], { height: 0, duration: 0.35, ease: 'power3.out' }); }
    setOpen(next);
  };

  return (
    <section className="relative py-28 md:py-40 bg-porcelain">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">FAQ</MaskedReveal>
          <MaskedReveal className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-sapphire">Questions<br /><span className="text-cobalt">worth answering.</span></MaskedReveal>
        </div>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-cobalt/15">
              <button onClick={() => toggle(i)} className="w-full text-left p-5 flex items-center justify-between gap-4">
                <span className="font-semibold text-sapphire text-sm md:text-base pr-4">{faq.q}</span>
                <span className={`text-cobalt shrink-0 transition-transform duration-300 text-xl ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div ref={(el) => { refs.current[i] = el; }} className="overflow-hidden" style={{ height: 0 }}>
                <div className="px-5 pb-5 text-muted/55 text-sm leading-relaxed">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
