import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';

gsap.registerPlugin(ScrollTrigger);

export default function FlipbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { drawFrame(canvas, ctx, 1); return; }

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      canvas.width = r.width * 2; canvas.height = r.height * 2;
      canvas.style.width = `${r.width}px`; canvas.style.height = `${r.height}px`;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx2 = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: '+=200%',
        pin: true, anticipatePin: 1, scrub: 0.8,
        onUpdate: (self) => {
          const fi = Math.min(Math.floor(self.progress * frameCount), frameCount - 1);
          drawFrame(canvas, ctx, fi / (frameCount - 1));
        },
      });
    }, sectionRef);

    return () => { ctx2.revert(); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-porcelain">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 lg:px-12 py-16">
        <div className="lg:w-[38%] shrink-0">
          <MaskedReveal className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">Mechanism</MaskedReveal>
          <MaskedReveal className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-none text-sapphire mb-4">
            From powder
            <br /><span className="text-cobalt">to repair signal.</span>
          </MaskedReveal>
          <MaskedReveal className="text-muted/60 leading-relaxed max-w-sm">
            Scroll to watch GHK-Cu dissolve into the bloodstream, bind to copper transport proteins, and initiate DNA repair at the cellular level.
          </MaskedReveal>
        </div>

        <div className="flex-1 w-full h-[55vh] lg:h-full relative rounded-3xl overflow-hidden border border-sapphire/5 bg-pure-white">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </section>
  );
}

function drawFrame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, p: number) {
  const w = canvas.width / 2, h = canvas.height / 2;
  const cx = w / 2, cy = h * 0.45;
  ctx.clearRect(0, 0, w, h);

  // Background
  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.7);
  bg.addColorStop(0, '#F0F4F8'); bg.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

  // Powder pile → dissolver into bloodstream
  const dissolve = Math.min(p * 1.4, 1);
  const powderRemaining = 1 - dissolve;

  if (powderRemaining > 0) {
    // Powder pile
    const pileY = cy + 30;
    const pileR = 50 * powderRemaining;

    for (let i = 0; i < 40 * powderRemaining; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * pileR;
      const x = cx + Math.cos(angle) * r * (0.5 + Math.random() * 0.5);
      const y = pileY - Math.random() * 20 * powderRemaining + Math.sin(angle * 3) * 5;
      const size = 1.5 + Math.random() * 3 * powderRemaining;
      ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = powderRemaining > 0.3
        ? `rgba(59, 130, 246, ${0.6 + Math.random() * 0.3})`
        : `rgba(30, 91, 250, ${0.3 + Math.random() * 0.4})`;
      ctx.fill();
    }

    // Label
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillStyle = `rgba(10, 31, 68, ${0.4 + powderRemaining * 0.5})`;
    ctx.textAlign = 'center';
    ctx.fillText('GHK-Cu Lyophilized', cx, pileY + 40 * powderRemaining + 18);
  }

  // Dissolving particles flowing down
  if (p > 0.1) {
    const flowCount = Math.floor((p - 0.1) * 100);
    for (let i = 0; i < flowCount; i++) {
      const t = (i / flowCount);
      const streamX = cx + Math.sin(t * 8 + p * 6) * 40;
      const streamY = cy + 50 + t * (h * 0.5);
      const s = 2 + (1 - t) * 4;
      ctx.beginPath(); ctx.arc(streamX, streamY, s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + (1 - Math.abs(t - 0.5) * 2) * 0.4})`;
      ctx.fill();
    }
  }

  // DNA strand forming at the bottom
  if (p > 0.35) {
    const dnaP = Math.min((p - 0.35) / 0.5, 1);
    const baseY = cy + h * 0.38;
    const strandW = 90;
    const turns = 2.5;
    const visibleLen = dnaP * (h * 0.42);

    for (let y = 0; y < visibleLen; y += 1.5) {
      const t = y / (h * 0.42);
      if (t > dnaP) break;
      const angle = t * turns * Math.PI * 2;

      // Strand 1
      const x1 = cx + Math.cos(angle) * strandW * 0.3;
      const x2 = cx + Math.cos(angle + Math.PI) * strandW * 0.3;

      const nY = baseY - y * 0.5;

      ctx.beginPath(); ctx.arc(x1, nY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30, 91, 250, ${0.5 + t * 0.3})`; ctx.fill();

      ctx.beginPath(); ctx.arc(x2, nY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 120, 62, ${0.4 + t * 0.3})`; ctx.fill();

      // Rung
      if (y % 8 === 0) {
        ctx.beginPath(); ctx.moveTo(x1, nY); ctx.lineTo(x2, nY);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 + t * 0.15})`;
        ctx.lineWidth = 0.6; ctx.stroke();
      }
    }

    // Labels
    if (dnaP > 0.5) {
      ctx.font = '500 10px Inter, sans-serif';
      ctx.fillStyle = `rgba(10, 31, 68, ${(dnaP - 0.5) * 1.5})`;
      ctx.textAlign = 'center';
      ctx.fillText('Copper Transport Protein (CTR1)', cx, baseY - visibleLen * 0.5 - 8);
      ctx.fillText('DNA Repair Cascade', cx, baseY + 20);
    }
  }

  // Copper dots around
  if (p > 0.15) {
    for (let i = 0; i < 15; i++) {
      const cuX = cx + Math.cos(p * 3 + i * 1.5) * (70 + Math.sin(p * 5 + i) * 30);
      const cuY = cy - 10 + Math.sin(p * 4 + i) * 60 + p * 60;
      ctx.beginPath(); ctx.arc(cuX, cuY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 169, 112, ${0.5 + Math.sin(p * 4 + i) * 0.3})`; ctx.fill();
    }
  }
}
