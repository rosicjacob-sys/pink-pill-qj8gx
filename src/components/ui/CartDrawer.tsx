import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } from '../../lib/cart';
import { checkout } from '../../lib/checkout';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(getCart());
  const [count, setCount] = useState(getCartCount());
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => { setCart(getCart()); setCount(getCartCount()); };
    window.addEventListener('cart-updated', h);
    return () => window.removeEventListener('cart-updated', h);
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (open) {
      gsap.set(overlay, { display: 'block' });
      gsap.to(overlay, { opacity: 1, duration: 0.25 });
      gsap.fromTo(drawer, { x: '100%' }, { x: '0%', duration: 0.45, ease: 'power3.out' });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.25, onComplete: () => gsap.set(overlay, { display: 'none' }) });
      gsap.to(drawer, { x: '100%', duration: 0.35, ease: 'power3.in' });
    }
  }, [open]);

  const total = getCartTotal();

  return (
    <>
      <div onClick={() => setOpen(true)} className="fixed top-6 right-6 z-[99997] w-12 h-12 bg-royal-pink text-pure-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_35px_rgba(255,46,136,0.5)] hover:scale-110 transition-all duration-300">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-deep-pink text-white text-[10px] rounded-full flex items-center justify-center font-bold">{count}</span>}
      </div>

      <div ref={overlayRef} onClick={() => setOpen(false)} className="fixed inset-0 bg-plum/40 z-[99996]" style={{ display: 'none', opacity: 0 }} />

      <div ref={drawerRef} className="fixed top-0 right-0 h-full w-full max-w-md bg-pure-white z-[99997] shadow-2xl flex flex-col" style={{ transform: 'translateX(100%)' }} data-lenis-prevent>
        <div className="flex items-center justify-between p-5 border-b border-warm-black/[0.05]">
          <h3 className="text-base font-display font-bold text-warm-black">Cart ({count})</h3>
          <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-warm-black/[0.04] text-xl transition-colors">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center py-20"><p className="text-5xl mb-3">🛒</p><p className="text-muted/50 text-sm">Your cart is empty</p></div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-porcelain rounded-2xl">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-pink to-deep-pink flex items-center justify-center shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-warm-black text-sm">{item.name}</h4>
                    <p className="text-[11px] text-muted/50">{item.variant}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-warm-black/[0.08] rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-xs text-muted hover:text-royal-pink">−</button>
                        <span className="w-7 text-center text-xs font-mono">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-xs text-muted hover:text-royal-pink">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[11px] text-muted/40 hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-sm">${item.price * item.quantity}</div>
                    <div className="text-[10px] text-muted/40">${item.price} ea</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-warm-black/[0.05]">
            <div className="flex justify-between mb-3"><span className="text-sm text-muted/60">Subtotal</span><span className="font-mono font-bold text-base">${total}</span></div>
            <button onClick={() => { checkout(); setOpen(false); }} className="w-full py-3.5 bg-royal-pink text-pure-white rounded-full font-bold hover:bg-deep-pink hover:shadow-[0_0_30px_rgba(255,46,136,0.4)] transition-all duration-300">
              Checkout → ${total}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
