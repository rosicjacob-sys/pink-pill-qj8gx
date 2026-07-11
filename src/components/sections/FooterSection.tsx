import { useState } from 'react';
import MagneticElement from '../animation/MagneticElement';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState(false);
  const handle = (e: React.FormEvent) => { e.preventDefault(); if (email) { setSub(true); setEmail(''); setTimeout(() => setSub(false), 3000); } };

  return (
    <footer className="relative bg-night text-pure-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-night to-sapphire/90" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cobalt/[0.04] rounded-full blur-[180px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="text-2xl font-display font-black mb-4">GHK-<span className="text-cobalt">Cu</span></div>
            <p className="text-pure-white/20 text-sm leading-relaxed mb-6">The copper peptide your body already knows. Lyophilized. Pure. Ready to signal.</p>
            <p className="text-[10px] text-pure-white/10">© {new Date().getFullYear()} GHK-Cu Research</p>
          </div>
          <div><h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/20 font-mono mb-4">Shop</h4><div className="space-y-2 text-sm text-pure-white/20">{['GHK-Cu Powder','Subscribe','Bacteriostatic Water','Supplies'].map(l => <a key={l} href="#" className="block hover:text-cobalt transition-colors">{l}</a>)}</div></div>
          <div><h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/20 font-mono mb-4">Learn</h4><div className="space-y-2 text-sm text-pure-white/20">{['Research','Mechanism','Studies','Protocols'].map(l => <a key={l} href="#" className="block hover:text-cobalt transition-colors">{l}</a>)}</div></div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-pure-white/20 font-mono mb-4">Research updates</h4>
            <p className="text-sm text-pure-white/15 mb-4">New clinical data, protocols, and peptide science. Once a month, no noise.</p>
            <form onSubmit={handle} className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-4 py-3 bg-pure-white/[0.03] border border-pure-white/[0.06] rounded-full text-sm text-pure-white placeholder:text-pure-white/[0.1] focus:outline-none focus:border-cobalt/40 transition-colors" />
              <MagneticElement>
                <button type="submit" className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 ${sub ? 'bg-emerald-500 text-white' : 'bg-cobalt text-pure-white hover:bg-[#1648E0]'}`}>{sub ? '✓' : '→'}</button>
              </MagneticElement>
            </form>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-pure-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-pure-white/[0.08]">
          <div className="flex gap-6">{['Privacy','Terms','COA'].map(l => <a key={l} href="#" className="hover:text-cobalt/60 transition-colors">{l}</a>)}</div>
          <p>FDA Disclaimer: These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. For research and cosmetic use.</p>
        </div>
      </div>
    </footer>
  );
}
