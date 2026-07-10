import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, destroyScroll } from './lib/lenis-config';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/animation/CustomCursor';
import CartDrawer from './components/ui/CartDrawer';
import StickyBuyBar from './components/ui/StickyBuyBar';
import HeroSection from './components/sections/HeroSection';
import TrustStrip from './components/sections/TrustStrip';
import ScienceSection from './components/sections/ScienceSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import HorizontalGallery from './components/sections/HorizontalGallery';
import BenefitsGrid from './components/sections/BenefitsGrid';
import ProofSection from './components/sections/ProofSection';
import BuyBlock from './components/sections/BuyBlock';
import FAQSection from './components/sections/FAQSection';
import FooterSection from './components/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      // Initialize smooth scroll after preloader
      initScroll();

      // Scroll to top
      window.scrollTo(0, 0);

      // Animate main content in
      if (mainRef.current) {
        gsap.fromTo(
          mainRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      }

      return () => {
        destroyScroll();
      };
    }
  }, [loading]);

  useEffect(() => {
    // Initialize dataLayer for analytics
    (window as any).dataLayer = (window as any).dataLayer || [];

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {!loading && (
        <>
          <CustomCursor />
          <CartDrawer />
          <StickyBuyBar />

          <div ref={mainRef}>
            <HeroSection />
            <TrustStrip />
            <ScienceSection />
            <HowItWorksSection />
            <HorizontalGallery />
            <BenefitsGrid />
            <ProofSection />
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
