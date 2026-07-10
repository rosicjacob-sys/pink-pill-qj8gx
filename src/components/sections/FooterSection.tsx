import { useState } from 'react';
import MagneticElement from '../animation/MagneticElement';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-plum text-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-display font-black mb-4">
              The <span className="text-royal-pink">Pink</span> One
            </div>
            <p className="text-muted/60 text-sm leading-relaxed mb-6">
              One capsule. Daily. That's the whole routine.
            </p>
            <div className="space-y-2 text-xs text-muted/40">
              <p>© {new Date().getFullYear()} Pink One Wellness</p>
              <p>All rights reserved.</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-muted/60 font-mono mb-4">Shop</h4>
            <div className="space-y-2 text-sm text-muted/50">
              <a href="#buy-block" className="block hover:text-royal-pink transition-colors">Buy Now</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Subscribe & Save</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Gift Cards</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Wholesale</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-muted/60 font-mono mb-4">Learn</h4>
            <div className="space-y-2 text-sm text-muted/50">
              <a href="#" className="block hover:text-royal-pink transition-colors">The Science</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Ingredients</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Blog</a>
              <a href="#" className="block hover:text-royal-pink transition-colors">Research</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-muted/60 font-mono mb-4">Join the list</h4>
            <p className="text-sm text-muted/50 mb-4">
              Research roundups, member-only offers, and the occasional dispatch from the lab.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-pure-white/5 border border-pure-white/10 rounded-full text-sm text-pure-white placeholder:text-muted/30 focus:outline-none focus:border-royal-pink/50 transition-colors"
                required
              />
              <MagneticElement>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    subscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-royal-pink text-pure-white hover:bg-deep-pink'
                  }`}
                >
                  {subscribed ? '✓' : '→'}
                </button>
              </MagneticElement>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-pure-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/30">
          <div className="flex gap-6">
            <a href="#" className="hover:text-royal-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-royal-pink transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-royal-pink transition-colors">Cookie Policy</a>
          </div>
          <p>
            FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
