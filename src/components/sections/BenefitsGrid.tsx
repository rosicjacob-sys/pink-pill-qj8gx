import MaskedReveal from '../animation/MaskedReveal';

const benefits = [
  { icon: '🧠', title: 'Calm Focus', desc: 'Alpha-wave brain state. Think clearly under pressure. No sedation, no tunnel vision.' },
  { icon: '⚡', title: 'Clean Energy', desc: 'Zero caffeine. Mitochondrial support that lasts all day. Energy without the edge.' },
  { icon: '🛡️', title: 'Stress Shield', desc: 'Cortisol down 27%. You still feel stress. It just doesn\'t run the show anymore.' },
  { icon: '🌙', title: 'Deep Recovery', desc: 'Fall asleep faster. Stay asleep deeper. Wake up without the morning grog.' },
  { icon: '🏃', title: 'Faster Rebuild', desc: 'Magnesium + Zinc support muscle repair. Less next-day soreness after workouts.' },
  { icon: '🎯', title: 'Mood Balance', desc: 'Neurotransmitter precursors. Natural dopamine and serotonin support. Level, not flat.' },
];

export default function BenefitsGrid() {
  return (
    <section className="relative py-28 md:py-40 bg-porcelain overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deep-pink/[0.02] rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Benefits</MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black">
            Everything changes
            <br /><span className="text-royal-pink">when your brain works.</span>
          </MaskedReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="glass rounded-2xl p-7 transition-all duration-500 hover:bg-white/25 hover:shadow-[0_16px_40px_rgba(255,46,136,0.05)] hover:-translate-y-1 group">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-display font-bold text-warm-black mb-2">{b.title}</h3>
              <p className="text-sm text-muted/60 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
