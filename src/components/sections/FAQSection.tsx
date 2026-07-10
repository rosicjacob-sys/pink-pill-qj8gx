import { useState, useRef } from 'react';
import gsap from 'gsap';
import MaskedReveal from '../animation/MaskedReveal';

const faqs = [
  {
    q: 'How quickly will I feel the effects?',
    a: 'Most people notice calmer focus within 30–60 minutes of their first dose, thanks to L-Theanine\'s rapid absorption. The adaptogens (Ashwagandha) build over 7–14 days for full stress-resilience benefits.',
  },
  {
    q: 'Can I take this with my current medications?',
    a: 'The Pink One is formulated with GRAS (Generally Recognized As Safe) ingredients at therapeutic doses. However, we always recommend consulting your physician before combining supplements with prescription medications, especially SSRIs, MAOIs, or blood pressure medications.',
  },
  {
    q: 'Is there caffeine in The Pink One?',
    a: 'Zero caffeine. The clean energy comes from mitochondrial support (Magnesium, B6, Zinc) and neurotransmitter optimization — not stimulants. No jitters, no crash, no dependency.',
  },
  {
    q: 'What if it doesn\'t work for me?',
    a: 'Every order is covered by our 30-day money-back guarantee. If you don\'t love how you feel, email us and we\'ll refund every dollar — no return necessary for your first bottle.',
  },
  {
    q: 'Is this third-party tested?',
    a: 'Yes. Every batch is tested by an ISO 17025 accredited lab for purity, potency, and contaminants. Certificates of Analysis are available upon request.',
  },
  {
    q: 'Can I take more than one per day?',
    a: 'One capsule is calibrated for 24-hour coverage. Taking more does not increase benefits and may exceed safe upper limits for certain ingredients. Stick to the suggested use.',
  },
  {
    q: 'Is the capsule vegetarian?',
    a: 'Yes. We use pullulan capsules (fermented tapioca) — vegan, preservative-free, and oxygen-barrier protected for maximum potency.',
  },
  {
    q: 'Where is it manufactured?',
    a: 'Manufactured in the United States in an FDA-registered, GMP-certified facility. Every batch receives a certificate of analysis before release.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;

    // Animate closing
    if (openIndex !== null) {
      const el = contentRefs.current[openIndex];
      if (el) {
        gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    }

    // Animate opening
    if (next !== null) {
      const el = contentRefs.current[next];
      if (el) {
        gsap.set(el, { height: 'auto' });
        gsap.from(el, { height: 0, duration: 0.4, ease: 'power3.out' });
      }
    }

    setOpenIndex(next);
  };

  return (
    <section className="relative py-24 md:py-32 bg-porcelain">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
            08 — FAQ
          </MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-warm-black">
            Everything you
            <br />
            <span className="text-royal-pink">need to know.</span>
          </MaskedReveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-pure-white rounded-2xl border border-warm-black/5 overflow-hidden transition-all duration-300 hover:border-royal-pink/20"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left p-6 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-warm-black pr-4">{faq.q}</span>
                <span
                  className={`text-xl text-royal-pink shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6 text-muted leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance note */}
        <div className="mt-16 p-6 bg-pure-white rounded-2xl border border-warm-black/5 text-center">
          <p className="text-xs text-muted/60 leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Individual results may vary. Always consult with a qualified healthcare professional
            before beginning any new dietary supplement regimen.
          </p>
        </div>
      </div>
    </section>
  );
}
