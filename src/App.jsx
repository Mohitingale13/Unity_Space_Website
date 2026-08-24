import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';

import StarfieldCanvas from './components/atmosphere/StarfieldCanvas';
import NebulaGlow from './components/atmosphere/NebulaGlow';
import GrainOverlay from './components/atmosphere/GrainOverlay';
import CustomCursor from './components/atmosphere/CustomCursor';
import Navbar from './components/navigation/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';

import './styles/index.css';

export default function App() {
  useEffect(() => {
    // Media query check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="aerospace-viewport">
        {/* Layer 1-3: Multi-Tier Atmospheric Canvas & Overlays */}
        <StarfieldCanvas />
        <NebulaGlow />
        <GrainOverlay />
        <CustomCursor />

        {/* Global Floating Glass Capsule Header */}
        <Navbar />

        {/* Route Outlets */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Home />} />
            <Route path="/projects" element={<Home />} />
            <Route path="/team" element={<Home />} />
            <Route path="/insights" element={<Home />} />
            <Route path="/sponsors" element={<Home />} />
            <Route path="/contact" element={<Home />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
