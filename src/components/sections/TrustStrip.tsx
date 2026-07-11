import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = ['Nature', 'Science', 'Cell', 'PNAS', 'The Lancet', 'JBC', 'JID', 'NEJM', 'EMBO', 'FASEB', 'JCI', 'PLOS', 'ACS', 'RSC', 'Springer'];

export default function TrustStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = trackRef.current;
    const clone = track.cloneNode(true) as HTMLDivElement;
    track.parentElement?.appendChild(clone);
    const tl = gsap.timeline({ repeat: -1 }); tl.to(track, { x: '-50%', duration: 30, ease: 'none' }); tl.to(clone, { x: '-50%', duration: 30, ease: 'none' }, 0);
    return () => { tl.kill(); clone.remove(); };
  }, []);
  return (
    <section className="relative py-10 bg-pure-white overflow-hidden border-y border-sapphire/[0.03]">
      <div className="overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div ref={trackRef} className="flex gap-14 md:gap-20 items-center px-8">
            {logos.map((l, i) => <span key={i} className="text-lg md:text-xl font-display font-bold text-sapphire/[0.05] hover:text-cobalt/25 transition-colors duration-700 select-none">{l}</span>)}
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-pure-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pure-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
