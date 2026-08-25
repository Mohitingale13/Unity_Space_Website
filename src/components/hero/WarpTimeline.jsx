import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const timelineData = [
  {
    range: '1957 — 2012',
    count: '150',
    unit: 'ANNUAL LAUNCHES',
    description: 'The early dawn of aerospace exploration, characterized by governmental missions and orbital firsts.',
    telemetry: 'ERA: GENESIS',
  },
  {
    range: 'In 2013',
    count: '210+',
    unit: 'COMMERCIAL SATELLITES',
    description: 'Marking the beginning of exponential aerospace growth and the rise of student-led satellite & rocketry programs.',
    telemetry: 'ERA: COMMERCIALIZATION',
  },
  {
    range: 'By 2020',
    count: '12,000+',
    unit: 'ORBITAL ASSETS',
    description: 'Constellation deployments and autonomous telemetry systems revolutionized global communications.',
    telemetry: 'ERA: CONSTELLATIONS',
  },
  {
    range: 'Future & Unity Space',
    count: '1,000,000+',
    unit: 'CONNECTED HORIZONS',
    description: 'Democratizing student aerospace engineering, autonomous rocketry research, and high-altitude flight access from SVPM COE.',
    telemetry: 'ERA: DEEP SPACE EXPANSION',
  },
];

/**
 * High-Performance Three.js Particle Warp Speed Field
 * Accelerates Z-axis particle velocity and pulls particles inward as scroll progress increases
 */
function WarpParticleCanvas({ progressRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 2200;
    let animationFrameId = null;
    let isVisible = true;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // 2. 3D Particles Buffer Geometry
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);

    const cyanColor = new THREE.Color(0x66e6ff);
    const purpleColor = new THREE.Color(0x8b7cff);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 55;
      const z = (Math.random() - 0.5) * 80;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPos[i * 3] = x;
      initialPos[i * 3 + 1] = y;
      initialPos[i * 3 + 2] = z;

      // Color distribution
      const mixRatio = Math.random();
      const pointColor = mixRatio < 0.6 ? cyanColor : mixRatio < 0.85 ? purpleColor : whiteColor;

      colors[i * 3] = pointColor.r;
      colors[i * 3 + 1] = pointColor.g;
      colors[i * 3 + 2] = pointColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Glowing Particle Shader / Material
    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Auto-Pause via IntersectionObserver (Mobile Power Saver)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 4. Animation Loop with Scroll-Driven Warp Physics
    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
      const progress = progressRef.current; // 0.0 to 1.0

      const posArr = geometry.attributes.position.array;

      // Fast particle rush toward screen as scroll increases (Warp speed)
      const baseSpeed = 0.08 + progress * 1.4;
      const vortexPull = 1 - progress * 0.45;

      for (let i = 0; i < count; i++) {
        // Advance Z position toward camera
        posArr[i * 3 + 2] += baseSpeed;

        // Loop particles back when they pass the viewer
        if (posArr[i * 3 + 2] > 25) {
          posArr[i * 3 + 2] = -55;
          posArr[i * 3] = initialPos[i * 3] * vortexPull;
          posArr[i * 3 + 1] = initialPos[i * 3 + 1] * vortexPull;
        }

        // Dynamic vortex contraction effect at high scroll progress
        if (progress > 0.6) {
          posArr[i * 3] *= 0.995;
          posArr[i * 3 + 1] *= 0.995;
        }
      }

      // Gentle orbital roll
      particles.rotation.z += 0.0015 + progress * 0.008;

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    render();

    // 5. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [progressRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Scroll-Pinned Warp Timeline Section
 * Pins the viewport while scrub-animating through historical aerospace milestones and particle acceleration
 */
export default function WarpTimeline() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollHeight = containerRef.current.scrollHeight - window.innerHeight;

      if (totalScrollHeight <= 0) return;

      // Calculate scroll ratio (0 to 1) within pinned container
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollHeight));

      progressRef.current = progress;

      // Map progress ratio to current data index
      const newIndex = Math.min(
        timelineData.length - 1,
        Math.floor(progress * timelineData.length)
      );

      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStep = timelineData[activeIndex];

  return (
    <section
      ref={containerRef}
      style={{
        height: '350vh', // Pinned scroll track length
        position: 'relative',
        zIndex: 3,
      }}
      aria-label="Aerospace Evolution & Satellite Timeline"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 9, 13, 0.85) 50%, transparent 100%)',
        }}
      >
        {/* Dynamic 3D Warp Canvas Background */}
        <WarpParticleCanvas progressRef={progressRef} />

        {/* Content Container */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem 1rem',
          }}
        >
          {/* Section Header Tag */}
          <div
            className="mono-tag"
            style={{
              marginBottom: '1rem',
              background: 'rgba(10, 12, 18, 0.8)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span>02 / AEROSPACE ACCELERATION PROTOCOL</span>
          </div>

          <div
            className="mono-label"
            style={{
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}
          >
            {currentStep.telemetry}
          </div>

          {/* Animated Timeline Step Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 1.06 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem 0',
                maxWidth: '680px',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.25rem',
                }}
              >
                TIMELINE WINDOW
              </div>

              {/* Year Range */}
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {currentStep.range}
              </h2>

              {/* Big Metric Count */}
              <div
                style={{
                  fontSize: 'clamp(2.8rem, 7vw, 5.2rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  color: '#66e6ff',
                  textShadow: '0 0 40px rgba(102, 230, 255, 0.6), 0 0 80px rgba(102, 230, 255, 0.25)',
                  lineHeight: 1,
                  marginBottom: '0.35rem',
                }}
              >
                {currentStep.count}
              </div>

              <div
                className="mono-label"
                style={{
                  color: 'var(--accent-secondary)',
                  letterSpacing: '0.15em',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                }}
              >
                {currentStep.unit}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                }}
              >
                {currentStep.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Timeline Scrub Indicator Bar */}
          <div
            style={{
              marginTop: '2rem',
              width: 'clamp(240px, 50vw, 420px)',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((activeIndex + 1) / timelineData.length) * 100}%`,
                background: 'linear-gradient(90deg, #8b7cff, #66e6ff)',
                borderRadius: '9999px',
                boxShadow: '0 0 15px rgba(102, 230, 255, 0.8)',
                transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          <div
            className="mono-label"
            style={{
              marginTop: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.68rem',
            }}
          >
            STAGE {activeIndex + 1} OF {timelineData.length} (SCROLL TO ENGAGE WARP)
          </div>
        </div>
      </div>
    </section>
  );
}
