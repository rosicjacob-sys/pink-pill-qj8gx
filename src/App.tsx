import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, destroyScroll } from './lib/lenis-config';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/animation/CustomCursor';
import CartDrawer from './components/ui/CartDrawer';
import ParticleBackground from './components/animation/ParticleBackground';
import WebGLErrorBoundary from './components/three/ErrorBoundary';
import StickyBuyBar from './components/ui/StickyBuyBar';
import HeroSection from './components/sections/HeroSection';
import TrustStrip from './components/sections/TrustStrip';
import FlipbookSection from './components/sections/FlipbookSection';
import ScienceSection from './components/sections/ScienceSection';
import StatsSection from './components/sections/StatsSection';
import BenefitsGrid from './components/sections/BenefitsGrid';
import BuyBlock from './components/sections/BuyBlock';
import FAQSection from './components/sections/FAQSection';
import FooterSection from './components/sections/FooterSection';

const CapsuleScene = lazy(() => import('./components/three/CapsuleScene'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      initScroll();
      window.scrollTo(0, 0);
      if (mainRef.current) gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      return () => destroyScroll();
    }
  }, [loading]);

  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    const h = () => ScrollTrigger.refresh();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <ParticleBackground />
          <CustomCursor />
          <CartDrawer />
          <StickyBuyBar />

          <div ref={mainRef}>
            {/* 3D Scene rendered behind hero */}
            <WebGLErrorBoundary>
              <Suspense fallback={null}>
                <CapsuleScene />
              </Suspense>
            </WebGLErrorBoundary>

            <HeroSection />
            <TrustStrip />
            <FlipbookSection />
            <ScienceSection />
            <StatsSection />
            <BenefitsGrid />
            <BuyBlock />
            <FAQSection />
            <FooterSection />
          </div>
        </>
      )}
    </>
  );
}

export default App;
