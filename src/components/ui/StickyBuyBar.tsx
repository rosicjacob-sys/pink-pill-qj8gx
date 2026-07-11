import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addToCart } from '../../lib/cart';

gsap.registerPlugin(ScrollTrigger);

export default function StickyBuyBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const hero = document.querySelector('section');
    if (!hero) return;
    const trigger = ScrollTrigger.create({
      trigger: hero, start: 'bottom top',
      onEnter: () => { if (barRef.current) gsap.fromTo(barRef.current, { y: '100%' }, { y: '0%', duration: 0.35, ease: 'power3.out' }); },
      onLeaveBack: () => { if (barRef.current) gsap.to(barRef.current, { y: '100%', duration: 0.3, ease: 'power3.in' }); },
    });
    return () => trigger.kill();
  }, []);

  const add = () => addToCart({ id: 'ghk-cu', name: 'GHK-Cu', price: 219, quantity: 1, variant: '3 Month Supply' });

  return (
    <div ref={barRef} className="fixed bottom-0 left-0 right-0 z-[99995] bg-pure-white/95 backdrop-blur-xl border-t border-sapphire/[0.04] p-4 md:hidden" style={{ transform: 'translateY(100%)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1"><div className="text-sm font-bold text-sapphire">GHK-Cu Copper Peptide</div><div className="text-xs text-muted/40">From $69 · Free shipping</div></div>
        <button onClick={add} className="px-6 py-3 bg-cobalt text-pure-white rounded-full font-bold text-sm hover:bg-[#1648E0] transition-colors whitespace-nowrap">Add to Cart</button>
      </div>
    </div>
  );
}
