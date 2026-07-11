import MaskedReveal from '../animation/MaskedReveal';
import MagneticElement from '../animation/MagneticElement';

export default function HeroSection() {
  const scrollToBuy = () => document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sapphire/5 via-transparent to-porcelain pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-cobalt font-mono mb-6" delay={0.5}>
            Copper Peptide · GHK-Cu
          </MaskedReveal>

          <MaskedReveal className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-[0.88] text-sapphire mb-8" delay={0.7}>
            Your DNA
            <br />
            already knows
            <br />
            <span className="text-cobalt">how to heal.</span>
          </MaskedReveal>

          <MaskedReveal className="text-lg md:text-xl text-muted/70 max-w-xl mb-10 font-body leading-relaxed" delay={1.1} stagger={0.012}>
            GHK-Cu is the signal your body lost with age. One peptide. Clinically proven to regenerate skin, repair DNA, and restore what time took.
          </MaskedReveal>

          <div style={{ opacity: 0, animation: 'fadeIn 0.6s ease-out 1.6s forwards' }}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticElement>
                <button onClick={scrollToBuy}
                  className="group relative px-10 py-4 bg-cobalt text-pure-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(30,91,250,0.4)] hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Get GHK-Cu
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-azure via-cobalt to-azure opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </MagneticElement>
              <div className="flex items-center gap-2 text-sm text-muted/60">
                <span className="text-copper">★</span>
                <span className="font-semibold text-sapphire">4.92</span>
                <span>·</span>
                <span>8,400+ reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-6 text-xs text-muted/40">
              <span>Lab-tested 99.2% purity</span>
              <span className="w-1 h-1 rounded-full bg-muted/20" />
              <span>Cold-processed</span>
              <span className="w-1 h-1 rounded-full bg-muted/20" />
              <span>Lyophilized powder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-porcelain to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
        <div className="w-6 h-10 rounded-full border-2 border-sapphire/15 flex justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-cobalt animate-bounce" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-mono">Scroll</span>
      </div>
    </section>
  );
}
