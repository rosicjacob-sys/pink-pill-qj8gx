import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addToCart } from '../../lib/cart';

gsap.registerPlugin(ScrollTrigger);

export default function StickyBuyBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'bottom top',
      onEnter: () => {
        if (barRef.current) {
          gsap.fromTo(barRef.current, { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' });
        }
      },
      onLeaveBack: () => {
        if (barRef.current) {
          gsap.to(barRef.current, { y: '100%', duration: 0.3, ease: 'power3.in' });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const handleAdd = () => {
    addToCart({
      id: 'pink-pill',
      name: 'The Pink One',
      price: 39,
      quantity: 1,
      variant: '3 Bottles',
    });
  };

  const scrollToBuy = () => {
    const buyBlock = document.getElementById('buy-block');
    if (buyBlock) {
      buyBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-[99995] bg-pure-white/95 backdrop-blur-xl border-t border-warm-black/5 p-4 md:hidden"
      style={{ transform: 'translateY(100%)' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1" onClick={scrollToBuy}>
          <div className="text-sm font-bold text-warm-black">The Pink One</div>
          <div className="text-xs text-muted">From $39 · Free shipping</div>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-royal-pink text-pure-white rounded-full font-bold text-sm hover:bg-deep-pink transition-colors whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
