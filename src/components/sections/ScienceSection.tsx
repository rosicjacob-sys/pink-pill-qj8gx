import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

const ingredients = [
  { name: 'GHK-Cu Tripeptide', dosage: '200', unit: 'mg/mL', desc: 'The copper peptide signal. Naturally present in human plasma at 200 ng/mL at age 20 — drops 60% by age 60. Restores wound healing, collagen synthesis, and antioxidant gene expression.', detail: 'Glycyl-L-Histidyl-L-Lysine', color: '#1E5BFA' },
  { name: 'Copper (II) Ion', dosage: '3.4', unit: 'mg/mL', desc: 'Essential cofactor for lysyl oxidase — the enzyme that cross-links collagen and elastin. Without copper, new collagen can\'t form stable fibers.', detail: 'Bioavailable Cu²⁺', color: '#C8783E' },
  { name: 'L-Lysine', dosage: '180', unit: 'mg', desc: 'Essential amino acid. Precursor to GHK. Supports collagen cross-linking and calcium absorption. Cannot be synthesized by the body.', detail: 'Essential amino acid', color: '#3B82F6' },
  { name: 'L-Glycine', dosage: '120', unit: 'mg', desc: 'The simplest amino acid. Core component of collagen\'s triple-helix structure. Every third residue in collagen is glycine.', detail: 'Collagen backbone', color: '#60A5FA' },
  { name: 'L-Histidine', dosage: '90', unit: 'mg', desc: 'Binds copper with picomolar affinity. The histidine residue in GHK is what captures the copper ion and delivers it to cells.', detail: 'Copper chelator', color: '#1E5BFA' },
];

export default function ScienceSection() {
  return (
    <section className="relative py-28 md:py-40 bg-porcelain overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cobalt/[0.03] rounded-full blur-[160px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">The formula</MaskedReveal>
          <MaskedReveal className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-sapphire">
            Five molecules.
            <br /><span className="text-cobalt">One regeneration cascade.</span>
          </MaskedReveal>
        </div>

        <div className="space-y-4 md:space-y-5">
          {ingredients.map((ing, i) => (
            <div key={i} className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-500 hover:bg-white/80 hover:border-cobalt/15">
              <div className="flex items-center gap-4 md:w-52 shrink-0">
                <span className="text-5xl font-display font-black opacity-[0.06]" style={{ color: ing.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-sapphire">{ing.name}</h3>
                  <p className="text-[11px] text-muted/50 mt-0.5">{ing.detail}</p>
                </div>
              </div>
              <div className="md:w-40 shrink-0">
                <CountUp end={parseFloat(ing.dosage)} decimals={1} suffix={` ${ing.unit}`} className="text-2xl md:text-3xl font-mono font-bold text-cobalt" />
                <p className="text-[10px] text-muted/40 mt-0.5 tracking-wider uppercase">Per serving</p>
              </div>
              <p className="text-muted/60 leading-relaxed flex-1 text-sm md:text-base">{ing.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
