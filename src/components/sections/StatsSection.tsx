import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

const stats = [
  { end: 70, suffix: '%', label: 'Collagen increase in 12 weeks' },
  { end: 84, suffix: '%', label: 'Reported visible skin improvement' },
  { end: 99.2, suffix: '%', label: 'HPLC purity' },
  { end: 91, suffix: '%', label: 'Would recommend' },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 md:py-40 bg-pure-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Clinical data</MaskedReveal>
          <MaskedReveal className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-sapphire">
            The numbers don't
            <br /><span className="text-cobalt">need interpretation.</span>
          </MaskedReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <CountUp end={s.end} decimals={s.end === 99.2 ? 1 : 0} suffix={s.suffix} className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-cobalt" />
              <p className="text-sm text-muted/50 mt-2 max-w-[140px] mx-auto">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: 'Claire D.', r: '45, Esthetician', t: 'I\'ve tried every peptide serum on the market. GHK-Cu powder is different — it\'s not a cosmetic, it\'s a signal. My clients see the difference in two weeks.', s: 'CD' },
            { n: 'Dr. Marcus T.', r: 'Dermatologist', t: 'The copper peptide research is irrefutable. GHK-Cu upregulates collagen, downregulates inflammatory cytokines, and chelates excess iron. This is what real skin regeneration looks like.', s: 'MT' },
            { n: 'Rebecca K.', r: '52, Marathon Runner', t: 'After my second marathon, recovery creams stopped working. GHK-Cu changed that in three weeks. Less redness, faster repair, skin that actually bounces back.', s: 'RK' },
          ].map((r, i) => (
            <div key={i} className="glass rounded-2xl p-7 transition-all duration-500 hover:shadow-[0_16px_50px_rgba(10,31,68,0.06)] hover:-translate-y-1">
              <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, s) => <span key={s} className="text-copper">★</span>)}</div>
              <p className="text-muted/60 leading-relaxed mb-6 text-sm italic">"{r.t}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-sapphire/[0.05]">
                <div className="w-9 h-9 rounded-full bg-cobalt/10 flex items-center justify-center text-cobalt font-bold text-xs">{r.s}</div>
                <div><div className="font-semibold text-sapphire text-sm">{r.n}</div><div className="text-xs text-muted/50">{r.r}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
