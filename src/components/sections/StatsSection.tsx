import MaskedReveal from '../animation/MaskedReveal';
import CountUp from '../animation/CountUp';

const stats = [
  { end: 12600, suffix: '+', label: 'Daily users' },
  { end: 98, suffix: '%', label: 'Subscription retention' },
  { end: 27, suffix: '%', label: 'Avg cortisol drop' },
  { end: 91, suffix: '%', label: 'Report better sleep' },
];

const reviews = [
  { name: 'Sarah M.', role: 'Product Designer', stars: 5, text: 'I was skeptical. Two weeks in, I stopped reaching for my 3pm coffee entirely. The focus is calm, not wired. Cannot go back.', initials: 'SM' },
  { name: 'James K.', role: 'Software Engineer', stars: 5, text: 'Replaced 4 different bottles with one. My blood work improved. My sleep tracker shows real data. Saves me $60/month.', initials: 'JK' },
  { name: 'Dr. Lisa R.', role: 'Clinical Psychologist', stars: 5, text: 'I recommend this to patients needing cognitive support without stimulants. The ingredient transparency is what sold me.', initials: 'LR' },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 md:py-40 bg-pure-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">The numbers</MaskedReveal>
          <MaskedReveal as="h2" className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-none text-warm-black">
            Results people
            <br /><span className="text-royal-pink">actually measure.</span>
          </MaskedReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <CountUp end={s.end} suffix={s.suffix} className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-royal-pink" />
              <p className="text-sm text-muted/60 mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="glass rounded-2xl p-7 transition-all duration-500 hover:shadow-[0_16px_50px_rgba(26,10,20,0.06)] hover:-translate-y-1">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, s) => <span key={s} className="text-royal-pink">★</span>)}
              </div>
              <p className="text-muted/70 leading-relaxed mb-6 text-sm italic">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-warm-black/[0.06]">
                <div className="w-9 h-9 rounded-full bg-royal-pink/10 flex items-center justify-center text-royal-pink font-bold text-xs">{r.initials}</div>
                <div><div className="font-semibold text-warm-black text-sm">{r.name}</div><div className="text-xs text-muted/50">{r.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
