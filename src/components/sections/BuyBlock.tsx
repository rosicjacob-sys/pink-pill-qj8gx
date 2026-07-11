import { useState } from 'react';
import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';
import { addToCart } from '../../lib/cart';

const variants = [
  { id: '1-vial', name: '1 Month Supply', subtitle: '30 servings · 200mg each', price: 89, orig: 109, badge: '' },
  { id: '3-vial', name: '3 Month Supply', subtitle: '90 servings · 200mg each', price: 219, orig: 327, badge: 'BEST VALUE', save: '$108' },
  { id: 'subscribe', name: 'Subscribe & Save', subtitle: 'Monthly delivery', price: 69, orig: 109, badge: 'MOST POPULAR', save: '$40/mo' },
];

export default function BuyBlock() {
  const [v, setV] = useState(variants[1]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    addToCart({ id: 'ghk-cu', name: 'GHK-Cu Copper Peptide', price: v.price, quantity: qty, variant: v.name });
    setAdded(true); setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="buy" className="relative py-28 md:py-40 bg-pure-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Get GHK-Cu</MaskedReveal>
            <MaskedReveal className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-none text-sapphire mb-6">
              GHK-Cu<br />Copper Peptide
            </MaskedReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl md:text-5xl font-mono font-bold text-cobalt">${v.price}</span>
              {v.price < v.orig && <span className="text-xl text-muted/30 line-through">${v.orig}</span>}
              {v.save && <span className="text-xs font-bold text-copper bg-copper/[0.08] px-3 py-1 rounded-full">{v.save}</span>}
            </div>
            <div className="space-y-2.5 mb-8">
              {variants.map((opt) => (
                <button key={opt.id} onClick={() => { setV(opt); setQty(1); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    v.id === opt.id ? 'border-cobalt bg-cobalt/[0.03] shadow-[0_0_30px_rgba(30,91,250,0.06)]' : 'border-sapphire/[0.06] hover:border-cobalt/20'
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sapphire">{opt.name}</span>
                      {opt.badge && <span className="ml-2 text-[10px] font-bold text-pure-white bg-cobalt px-2 py-0.5 rounded-full">{opt.badge}</span>}
                      <p className="text-xs text-muted/40 mt-0.5">{opt.subtitle}</p>
                    </div>
                    <div className="text-right"><div className="font-mono font-bold text-sapphire">${opt.price}</div>{opt.price < opt.orig && <div className="text-[11px] text-muted/30 line-through">${opt.orig}</div>}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold text-sapphire tracking-wider uppercase">Qty</span>
              <div className="flex items-center border border-sapphire/[0.08] rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-cobalt hover:bg-cobalt/[0.04] transition-colors text-lg">−</button>
                <span className="w-10 text-center font-mono font-bold text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-muted hover:text-cobalt hover:bg-cobalt/[0.04] transition-colors text-lg">+</button>
              </div>
            </div>
            <MagneticElement className="w-full">
              <button onClick={add} className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${added ? 'bg-emerald-500 text-white' : 'bg-cobalt text-pure-white hover:bg-[#1648E0] hover:shadow-[0_0_45px_rgba(30,91,250,0.35)]'}`}>{added ? '✓ Added' : 'Add to Cart →'}</button>
            </MagneticElement>
            <div className="flex items-center justify-center gap-6 mt-5 text-[11px] text-muted/30"><span>🔒 Secure</span><span>📦 Free $100+</span><span>↩ 60-day</span></div>
          </div>
          <div className="glass rounded-3xl p-8 md:p-10">
            <h3 className="text-base font-display font-bold text-sapphire mb-5 pb-4 border-b border-sapphire/[0.06]">Powder Analysis</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-sapphire/[0.04]"><span className="font-semibold text-sapphire">Serving</span><span className="text-muted/50">200 mg powder</span></div>
              <div className="flex justify-between pb-2 border-b border-sapphire/[0.04]"><span className="font-semibold text-sapphire">Servings</span><span className="text-muted/50">30 per container</span></div>
              {[{ n: 'GHK-Cu (Copper Tripeptide-1)', a: '200 mg' },{ n: 'Copper (as Cu²⁺)', a: '3.4 mg' },{ n: 'L-Lysine HCl', a: '180 mg' },{ n: 'Glycine', a: '120 mg' },{ n: 'L-Histidine', a: '90 mg' }].map((x, i) => (
                <div key={i} className="flex justify-between pb-2 border-b border-sapphire/[0.04]"><span className="text-sapphire/70">{x.n}</span><span className="font-mono text-xs text-muted/50">{x.a}</span></div>
              ))}
              <div className="pt-4 mt-2"><p className="text-[11px] text-muted/35 leading-relaxed"><strong>Use:</strong> Mix 200mg with 5mL bacteriostatic water. Apply topically or as directed. Store lyophilized powder at −20°C. Reconstituted solution stable for 30 days at 4°C.</p></div>
            </div>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted/25 max-w-2xl mx-auto mt-20 leading-relaxed">* These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. For research and cosmetic use.</p>
      </div>
    </section>
  );
}
