import { useState } from 'react';
import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';
import { addToCart } from '../../lib/cart';

const variants = [
  {
    id: '1-bottle',
    name: '1 Bottle',
    subtitle: '30-day supply',
    price: 49,
    originalPrice: 59,
    savings: '',
    popular: false,
  },
  {
    id: '3-pack',
    name: '3 Bottles',
    subtitle: '90-day supply',
    price: 39,
    originalPrice: 59,
    savings: 'Save $60',
    popular: true,
  },
  {
    id: 'subscribe',
    name: 'Subscribe & Save',
    subtitle: 'Monthly delivery',
    price: 35,
    originalPrice: 59,
    savings: 'Save $24/mo',
    popular: false,
  },
];

export default function BuyBlock() {
  const [selectedVariant, setSelectedVariant] = useState(variants[1]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: 'pink-pill',
      name: 'The Pink One',
      price: selectedVariant.price,
      quantity,
      variant: selectedVariant.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="buy-block" className="relative py-24 md:py-32 bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Product info */}
          <div className="lg:sticky lg:top-32">
            <MaskedReveal as="p" className="text-xs tracking-[0.25em] uppercase text-muted font-mono mb-4">
              07 — Get Yours
            </MaskedReveal>
            <MaskedReveal as="h2" className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-none text-warm-black mb-6">
              The Pink One
            </MaskedReveal>

            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-4xl md:text-5xl font-mono font-bold text-royal-pink">
                  ${selectedVariant.price}
                </span>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-2xl text-muted line-through">
                    ${selectedVariant.originalPrice}
                  </span>
                )}
                {selectedVariant.savings && (
                  <span className="text-sm font-semibold text-deep-pink bg-deep-pink/10 px-3 py-1 rounded-full">
                    {selectedVariant.savings}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted">Free shipping on orders over $50</p>
            </div>

            {/* Variant selector */}
            <div className="space-y-3 mb-10">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedVariant.id === v.id
                      ? 'border-royal-pink bg-royal-pink/5 shadow-[0_0_30px_rgba(255,46,136,0.1)]'
                      : 'border-warm-black/5 hover:border-royal-pink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-warm-black">{v.name}</span>
                        {v.popular && (
                          <span className="text-xs font-bold text-pure-white bg-royal-pink px-2 py-0.5 rounded-full">
                            BEST VALUE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted">{v.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-warm-black">${v.price}</div>
                      <div className="text-xs text-muted">per bottle</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-sm font-semibold text-warm-black uppercase tracking-wider">Qty</span>
              <div className="flex items-center gap-0 border border-warm-black/10 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-royal-pink hover:bg-royal-pink/5 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-mono font-bold text-warm-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-royal-pink hover:bg-royal-pink/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <MagneticElement className="w-full">
              <button
                onClick={handleAddToCart}
                className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-royal-pink text-pure-white hover:bg-deep-pink hover:shadow-[0_0_40px_rgba(255,46,136,0.4)]'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                  <span className="text-xl">{added ? '' : '→'}</span>
                </span>
              </button>
            </MagneticElement>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted">
              <span className="flex items-center gap-1">🔒 Secure checkout</span>
              <span className="flex items-center gap-1">📦 Free shipping $50+</span>
              <span className="flex items-center gap-1">↩ 30-day guarantee</span>
            </div>
          </div>

          {/* Right: Supplement Facts */}
          <div className="bg-porcelain rounded-3xl p-8 md:p-10 border border-warm-black/5">
            <h3 className="text-lg font-display font-bold text-warm-black mb-6 pb-4 border-b border-warm-black/10">
              Supplement Facts
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between pb-2 border-b border-warm-black/5">
                <span className="font-semibold text-warm-black">Serving Size</span>
                <span className="text-muted">1 Capsule</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-warm-black/5">
                <span className="font-semibold text-warm-black">Servings Per Container</span>
                <span className="text-muted">30</span>
              </div>

              <div className="space-y-3 mt-4">
                {[
                  { name: 'L-Theanine', amount: '200 mg' },
                  { name: 'Magnesium (as Glycinate)', amount: '150 mg' },
                  { name: 'Ashwagandha (KSM-66)', amount: '300 mg' },
                  { name: 'Vitamin B6 (as P-5-P)', amount: '10 mg' },
                  { name: 'Zinc (as Picolinate)', amount: '15 mg' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between pb-2 border-b border-warm-black/5">
                    <span className="text-warm-black">{item.name}</span>
                    <span className="font-mono text-muted">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-warm-black/10">
                <p className="text-xs text-muted leading-relaxed">
                  <strong>Suggested Use:</strong> Take one capsule daily with water, preferably in the morning or early afternoon.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FDA Disclaimer */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-xs text-muted/60 leading-relaxed">
            * These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Consult your physician before starting any new supplement regimen.
            Results may vary. Keep out of reach of children. Store in a cool, dry place.
          </p>
        </div>
      </div>
    </section>
  );
}
