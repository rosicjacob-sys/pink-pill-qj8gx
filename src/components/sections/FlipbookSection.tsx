import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedReveal from '../animation/MaskedReveal';

gsap.registerPlugin(ScrollTrigger);

export default function FlipbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 60;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      drawFrame(canvas, ctx, 0);
      return;
    }

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx2 = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: '+=200%',
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const frameIndex = Math.min(Math.floor(self.progress * frameCount), frameCount - 1);
          drawFrame(canvas, ctx, frameIndex / (frameCount - 1));
        },
      });
    }, sectionRef);

    return () => {
      ctx2.revert();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-porcelain">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 lg:px-12 py-16">
        {/* Left: Label */}
        <div className="lg:w-[40%] shrink-0">
          <MaskedReveal as="p" className="text-xs tracking-[0.3em] uppercase text-muted font-mono mb-4">
            Inside the capsule
          </MaskedReveal>
          <MaskedReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-none text-warm-black mb-4">
            Five compounds.
            <br />
            <span className="text-royal-pink">One perfect dose.</span>
          </MaskedReveal>
          <MaskedReveal className="text-muted/70 leading-relaxed max-w-sm">
            Scroll to watch the ingredients release. Each frame reveals another layer of what's inside.
          </MaskedReveal>
        </div>

        {/* Right: Canvas */}
        <div className="flex-1 w-full h-[60vh] lg:h-full relative rounded-3xl overflow-hidden border border-warm-black/5 bg-pure-white">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {/* Scroll progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-warm-black/5">
            <div className="flipbook-progress h-full bg-royal-pink origin-left" style={{ width: '0%' }} />
          </div>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-royal-pink/20 hidden lg:block" />
    </section>
  );
}

function drawFrame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, progress: number) {
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  const cx = w / 2;
  const cy = h / 2;

  ctx.clearRect(0, 0, w, h);

  // Subtle radial gradient background
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.8);
  bgGrad.addColorStop(0, '#FDF6FA');
  bgGrad.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Pill dimensions
  const pillW = 80;
  const pillH = 200;
  const r = pillW / 2;

  // Rotation based on progress
  const rotation = progress * Math.PI * 3;
  const scale = 1 + Math.sin(progress * Math.PI) * 0.15;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.rotate(rotation);

  // Shadow
  ctx.shadowColor = 'rgba(26, 10, 20, 0.15)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 15;

  // Pill gradient
  const pillGrad = ctx.createLinearGradient(-pillW, -pillH, pillW, pillH);
  pillGrad.addColorStop(0, '#FF2E88');
  pillGrad.addColorStop(0.4, '#FF5AA0');
  pillGrad.addColorStop(0.7, '#C4126B');
  pillGrad.addColorStop(1, '#8A0040');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  // Top rounded end
  ctx.arc(0, -pillH / 2 + r, r, Math.PI, 0, false);
  // Right side
  ctx.lineTo(r, pillH / 2 - r);
  // Bottom rounded end
  ctx.arc(0, pillH / 2 - r, r, 0, Math.PI, false);
  // Left side
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Gloss highlight
  const glossGrad = ctx.createLinearGradient(-r * 0.6, -pillH / 2, r * 0.8, pillH / 2);
  glossGrad.addColorStop(0, 'rgba(255,255,255,0.5)');
  glossGrad.addColorStop(0.3, 'rgba(255,255,255,0.15)');
  glossGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
  glossGrad.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = glossGrad;
  ctx.beginPath();
  ctx.arc(-r * 0.1, -pillH / 2 + r * 1.2, r * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Specular dot
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath();
  ctx.arc(-r * 0.15, -pillH / 2 + r * 1.5, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Ingredient particles that emerge as progress increases
  if (progress > 0.15) {
    const particleCount = Math.floor((progress - 0.15) * 80);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + progress * 4;
      const radius = 40 + progress * 140 + Math.sin(i * 7 + progress * 10) * 30;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      const size = 2 + (1 - (progress - 0.15)) * 8;

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 46, 136, ${0.3 + progress * 0.4})`;
      ctx.fill();

      // Connecting line back to pill for some particles
      if (i % 5 === 0) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        const lineAngle = angle + Math.sin(progress * 8) * 0.3;
        ctx.lineTo(cx + Math.cos(lineAngle) * 40, cy + Math.sin(lineAngle) * 40);
        ctx.strokeStyle = `rgba(255, 46, 136, ${0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Ingredient labels that appear
  if (progress > 0.3) {
    const labels = ['L-Theanine', 'Magnesium', 'Ashwagandha', 'Vitamin B6', 'Zinc'];
    const labelIndex = Math.min(Math.floor((progress - 0.3) / 0.14), labels.length - 1);

    for (let j = 0; j <= labelIndex; j++) {
      const angle = (j / labels.length) * Math.PI * 2 - Math.PI / 2 + progress * 2;
      const dist = 170 + j * 20;
      const lx = cx + Math.cos(angle) * dist;
      const ly = cy + Math.sin(angle) * dist;

      ctx.font = '400 12px Inter, sans-serif';
      ctx.fillStyle = `rgba(26, 10, 20, ${0.3 + (progress - 0.3 - j * 0.14) * 5})`;
      ctx.textAlign = 'center';
      ctx.fillText(labels[j], lx, ly);

      // Dot next to label
      ctx.beginPath();
      ctx.arc(lx, ly - 16, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FF2E88';
      ctx.fill();
    }
  }
}
