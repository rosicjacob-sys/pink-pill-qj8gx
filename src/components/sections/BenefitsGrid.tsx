import MaskedReveal from '../animation/MaskedReveal';

const benefits = [
  { icon: '🧬', title: 'DNA Repair', desc: 'GHK-Cu resets gene expression to a younger state. Upregulates 50+ repair genes suppressed by aging.' },
  { icon: '🔄', title: 'Collagen Synthesis', desc: 'Triples collagen I production. Activates TIMP-1 and TIMP-2 to prevent collagen breakdown.' },
  { icon: '🛡️', title: 'Antioxidant Defense', desc: 'Superoxide dismutase mimic. Neutralizes free radicals 100x more effectively than vitamin C.' },
  { icon: '💧', title: 'Wound Healing', desc: 'Chemotactic for macrophages and fibroblasts. Accelerates wound closure by 40% in controlled studies.' },
  { icon: '🔬', title: 'Epigenetic Reset', desc: 'Remodels the chromatin landscape. Reactivates silenced repair pathways through histone modification.' },
  { icon: '✨', title: 'Skin Barrier', desc: 'Increases filaggrin and involucrin. Restores the lipid matrix that keeps moisture in and irritants out.' },
];

export default function BenefitsGrid() {
  return (
    <section className="relative py-28 md:py-40 bg-porcelain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Benefits</MaskedReveal>
          <MaskedReveal className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-sapphire">
            Age is a signal.
            <br /><span className="text-cobalt">GHK-Cu is the reset.</span>
          </MaskedReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="glass rounded-2xl p-7 transition-all duration-500 hover:bg-white/80 hover:shadow-[0_16px_40px_rgba(30,91,250,0.05)] hover:-translate-y-1">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-display font-bold text-sapphire mb-2">{b.title}</h3>
              <p className="text-sm text-muted/55 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
