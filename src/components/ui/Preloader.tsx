import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps { onComplete: () => void; }

export default function Preloader({ onComplete }: PreloaderProps) {
  const [p, setP] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const max = reduced ? 100 : 2200;
    const start = Date.now();
    const int = setInterval(() => {
      const el = Math.min((Date.now() - start) / max, 1);
      setP(Math.round((1 - Math.pow(1 - el, 3)) * 100));
    }, 30);

    const fs = setTimeout(() => { if (!done.current) { setP(100); finish(); } }, max + 500);

    const finish = () => {
      if (done.current) return;
      done.current = true; clearInterval(int); clearTimeout(fs);
      if (ref.current) gsap.to(ref.current, { y: '-100%', duration: 0.7, ease: 'power4.inOut', onComplete });
    };

    const cd = setInterval(() => { if (p >= 100 && !done.current) { finish(); clearInterval(cd); } }, 50);
    return () => { clearInterval(int); clearInterval(cd); clearTimeout(fs); };
  }, [onComplete]);

  return (
    <div ref={ref} className="fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-sapphire">
      <div className="text-center">
        <div className="text-7xl md:text-9xl font-display font-black text-cobalt mb-8">{p}<span className="text-3xl md:text-5xl text-cobalt/60">%</span></div>
        <div className="w-64 h-1 bg-sapphire/50 rounded-full overflow-hidden mx-auto mb-6">
          <div className="h-full bg-gradient-to-r from-cobalt to-azure rounded-full transition-all duration-300" style={{ width: `${p}%` }} />
        </div>
        <p className="text-muted/40 text-sm tracking-widest uppercase font-mono">Loading GHK-Cu</p>
      </div>
    </div>
  );
}
