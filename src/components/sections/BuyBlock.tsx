import { useState } from 'react';
import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';
import { addToCart } from '../../lib/cart';

const variants = [
  { id: '1-bottle', name: '1 Bottle', subtitle: '30 capsules', price: 49, origPrice: 59, badge: '' },
  { id: '3-pack', name: '3 Bottles', subtitle: '90 capsules', price: 117, origPrice: 177, badge: 'BEST VALUE', save: '$60' },
  { id: 'subscribe', name: 'Subscribe', subtitle: 'Monthly delivery', price: 35, origPrice: 59, badge: 'POPULAR', save: '$24/mo' },
];

export default function BuyBlock() {
  const [variant, setVariant] = useState(variants[1]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id: 'pink-pill', name: 'The Pink One', price: variant.price, quantity: qty, variant: variant.name });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="buy" className="relative py-28 md:py-40 bg-pure-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Get yours</MaskedReveal>
            <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-warm-black mb-6">
              The Pink One
            </MaskedReveal>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl md:text-5xl font-mono font-bold text-royal-pink">${variant.price}</span>
              {variant.price < variant.origPrice && <span className="text-xl text-muted/40 line-through">${variant.origPrice}</span>}
              {variant.save && <span className="text-xs font-bold text-deep-pink bg-deep-pink/[0.08] px-3 py-1 rounded-full">{variant.save}</span>}
            </div>

            <div className="space-y-2.5 mb-8">
              {variants.map((v) => (
                <button key={v.id} onClick={() => { setVariant(v); setQty(1); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    variant.id === v.id ? 'border-royal-pink bg-royal-pink/[0.04] shadow-[0_0_30px_rgba(255,46,136,0.06)]' : 'border-warm-black/[0.06] hover:border-royal-pink/20'
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-warm-black">{v.name}</span>
                      {v.badge && <span className="ml-2 text-[10px] font-bold text-pure-white bg-royal-pink px-2 py-0.5 rounded-full">{v.badge}</span>}
                      <p className="text-xs text-muted/50 mt-0.5">{v.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-warm-black">${v.price}</div>
                      {v.price < v.origPrice && <div className="text-[11px] text-muted/40 line-through">${v.origPrice}</div>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold text-warm-black tracking-wider uppercase">Qty</span>
              <div className="flex items-center border border-warm-black/[0.08] rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-royal-pink hover:bg-royal-pink/[0.04] transition-colors text-lg">−</button>
                <span className="w-10 text-center font-mono font-bold text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-muted hover:text-royal-pink hover:bg-royal-pink/[0.04] transition-colors text-lg">+</button>
              </div>
            </div>

            <MagneticElement className="w-full">
              <button onClick={handleAdd}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  added ? 'bg-emerald-500 text-white' : 'bg-royal-pink text-pure-white hover:bg-deep-pink hover:shadow-[0_0_45px_rgba(255,46,136,0.4)]'
                }`}>
                {added ? '✓ Added to Cart' : 'Add to Cart →'}
              </button>
            </MagneticElement>

            <div className="flex items-center justify-center gap-6 mt-5 text-[11px] text-muted/40">
              <span>🔒 Secure checkout</span><span>📦 Free shipping $50+</span><span>↩ 30-day guarantee</span>
            </div>
          </div>

          {/* Supplement Facts panel */}
          <div className="glass rounded-3xl p-8 md:p-10">
            <h3 className="text-base font-display font-bold text-warm-black mb-5 pb-4 border-b border-warm-black/[0.06]">Supplement Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-warm-black/[0.04]"><span className="font-semibold text-warm-black">Serving Size</span><span className="text-muted/60">1 Capsule</span></div>
              <div className="flex justify-between pb-2 border-b border-warm-black/[0.04]"><span className="font-semibold text-warm-black">Servings</span><span className="text-muted/60">30 per bottle</span></div>
              {[{ name: 'L-Theanine', amt: '200 mg' },{ name: 'Magnesium (Glycinate)', amt: '150 mg' },{ name: 'Ashwagandha KSM-66', amt: '300 mg' },{ name: 'Vitamin B6 (P-5-P)', amt: '10 mg' },{ name: 'Zinc (Picolinate)', amt: '15 mg' }].map((item, i) => (
                <div key={i} className="flex justify-between pb-2 border-b border-warm-black/[0.04]"><span className="text-warm-black/80">{item.name}</span><span className="font-mono text-xs text-muted/60">{item.amt}</span></div>
              ))}
              <div className="pt-4 mt-2"><p className="text-[11px] text-muted/40 leading-relaxed"><strong>Suggested Use:</strong> One capsule daily with water, morning or early afternoon. Consult your physician before use.</p></div>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted/30 max-w-2xl mx-auto mt-20 leading-relaxed">
          * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.
        </p>
      </div>
    </section>
  );
}
