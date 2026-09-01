import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import StarfieldCanvas from './components/atmosphere/StarfieldCanvas';
import NebulaGlow from './components/atmosphere/NebulaGlow';
import GrainOverlay from './components/atmosphere/GrainOverlay';
import CustomCursor from './components/atmosphere/CustomCursor';
import TopBlurVignette from './components/atmosphere/TopBlurVignette';
import TouchFeedback from './components/atmosphere/TouchFeedback';
import Navbar from './components/navigation/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis instance globally for modal pause/resume
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <Router>
      <div className="aerospace-viewport">
        {/* Global Atmospheric Layers */}
        <StarfieldCanvas />
        <NebulaGlow />
        <GrainOverlay />
        <CustomCursor />
        
        {/* Progressive Top Depth-of-Field Blur Vignette */}
        <TopBlurVignette />

        {/* Global Aerospace Touch & Haptic Feedback Engine */}
        <TouchFeedback />

        {/* Dynamic Navigation */}
        <Navbar />

        {/* Main Content Viewport */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer />
      </div>
    </Router>
  );
}
