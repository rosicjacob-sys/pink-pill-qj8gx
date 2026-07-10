import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } from '../../lib/cart';
import { checkout } from '../../lib/checkout';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(getCart());
  const [count, setCount] = useState(getCartCount());
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(getCart());
      setCount(getCartCount());
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      }
      if (drawerRef.current) {
        gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }});
      }
      if (drawerRef.current) {
        gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      }
    }
  }, [isOpen]);

  const handleCheckout = () => {
    checkout();
    setIsOpen(false);
  };

  const total = getCartTotal();

  return (
    <>
      {/* Cart icon */}
      <div
        ref={cartIconRef}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[99997] w-12 h-12 bg-royal-pink text-pure-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,46,136,0.4)] transition-all duration-300 hover:scale-110"
        style={{ boxShadow: '0 4px 20px rgba(255, 46, 136, 0.3)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-deep-pink text-white text-xs rounded-full flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-plum/50 z-[99996]"
        style={{ display: 'none', opacity: 0 }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-pure-white z-[99997] shadow-2xl flex flex-col"
        style={{ transform: 'translateX(100%)' }}
        data-lenis-prevent
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-warm-black/5">
          <h3 className="text-lg font-display font-bold text-warm-black">
            Your Cart ({count})
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-warm-black/5 transition-colors text-xl"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🛒</p>
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-porcelain rounded-2xl border border-warm-black/5">
                  <div className="w-16 h-16 rounded-xl bg-royal-pink/10 flex items-center justify-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-pink to-deep-pink" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-warm-black text-sm">{item.name}</h4>
                    <p className="text-xs text-muted">{item.variant}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-0 border border-warm-black/10 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-muted hover:text-royal-pink"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-muted hover:text-royal-pink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="text-xs text-muted hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-warm-black">${item.price * item.quantity}</div>
                    <div className="text-xs text-muted">${item.price} ea</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-warm-black/5">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="font-mono font-bold text-warm-black text-lg">${total}</span>
            </div>
            <p className="text-xs text-muted/60 mb-4">Shipping calculated at checkout</p>
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-royal-pink text-pure-white rounded-full font-bold text-lg hover:bg-deep-pink hover:shadow-[0_0_30px_rgba(255,46,136,0.4)] transition-all duration-300"
            >
              Checkout → ${total}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
