import { useState } from 'react';
import MagneticElement from '../animation/MagneticElement';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000); }
  };

  return (
    <footer className="relative bg-plum text-pure-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-plum to-warm-black" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-pink/[0.04] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="text-2xl font-display font-black mb-4">The <span className="text-royal-pink">Pink</span> One</div>
            <p className="text-pure-white/30 text-sm leading-relaxed mb-6">One capsule. Daily. That's the whole routine.</p>
            <p className="text-[10px] text-pure-white/15">© {new Date().getFullYear()} Pink One Wellness</p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/25 font-mono mb-4">Shop</h4>
            <div className="space-y-2 text-sm text-pure-white/30">
              {['Buy Now', 'Subscribe', 'Gift Cards', 'Wholesale'].map((l) => (
                <a key={l} href="#" className="block hover:text-royal-pink transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/25 font-mono mb-4">Learn</h4>
            <div className="space-y-2 text-sm text-pure-white/30">
              {['The Science', 'Ingredients', 'Blog', 'Research'].map((l) => (
                <a key={l} href="#" className="block hover:text-royal-pink transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/25 font-mono mb-4">Join the list</h4>
            <p className="text-sm text-pure-white/20 mb-4">Research roundups, member offers, and dispatches from the lab.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                className="flex-1 px-4 py-3 bg-pure-white/[0.04] border border-pure-white/[0.08] rounded-full text-sm text-pure-white placeholder:text-pure-white/[0.15] focus:outline-none focus:border-royal-pink/40 transition-colors" />
              <MagneticElement>
                <button type="submit" className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 ${subscribed ? 'bg-emerald-500 text-white' : 'bg-royal-pink text-pure-white hover:bg-deep-pink'}`}>
                  {subscribed ? '✓' : '→'}
                </button>
              </MagneticElement>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-pure-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-pure-white/[0.12]">
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((l) => <a key={l} href="#" className="hover:text-royal-pink/60 transition-colors">{l}</a>)}
          </div>
          <p>FDA Disclaimer: These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
