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

const HelixScene = lazy(() => import('./components/three/HelixScene'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [ready, setReady] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready) {
      initScroll();
      window.scrollTo(0, 0);
      if (mainRef.current) gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      return () => destroyScroll();
    }
  }, [ready]);

  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    window.addEventListener('resize', () => ScrollTrigger.refresh());
    return () => window.removeEventListener('resize', () => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      {ready && (
        <>
          <ParticleBackground />
          <CustomCursor />
          <CartDrawer />
          <StickyBuyBar />
          <div ref={mainRef}>
            <WebGLErrorBoundary>
              <Suspense fallback={null}><HelixScene /></Suspense>
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
