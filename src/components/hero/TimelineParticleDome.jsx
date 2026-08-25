import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Morphing Celestial Planet Sphere
 * Refinements:
 * 1. Lowered Vertical Position: Shifted down (-1.85 desktop, -1.2 mobile) to leave clean breathing room above.
 * 2. Faster Celestial Particle Motion: Increased rotation speed (0.045) and organic shimmer.
 * 3. Cap-Shaped Upward Curved Bottom Dissolution.
 * 4. Dense Glowing Outer Rim with Sparse Center for text clarity.
 */

export default function TimelineParticleDome({ progress = 0 }) {
  const containerRef = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = null;
    let isVisible = true;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 5000 : 9800;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Position & Color Buffers
    const initialPositions = new Float32Array(PARTICLE_COUNT * 3);
    const planetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const radius = isMobile ? 4.8 : 6.8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Position A: Symmetrical Wide 3D Space Dispersion (Start / 1957)
      const spreadX = isMobile ? 44 : 70;
      const spreadY = isMobile ? 32 : 52;
      const spreadZ = 60;

      initialPositions[i3] = (Math.random() - 0.5) * spreadX;
      initialPositions[i3 + 1] = (Math.random() - 0.5) * spreadY;
      initialPositions[i3 + 2] = (Math.random() - 0.5) * spreadZ;

      // Position B: 3D Fibonacci Sphere with Rim Concentration
      const isRimParticle = i < PARTICLE_COUNT * 0.78;

      let phi, theta;
      if (isRimParticle) {
        const v = Math.random();
        phi = Math.acos((Math.random() - 0.5) * 1.95);
        theta = v * Math.PI * 2;
      } else {
        phi = Math.acos(-1 + (2 * (i - PARTICLE_COUNT * 0.78)) / (PARTICLE_COUNT * 0.22));
        theta = Math.sqrt((PARTICLE_COUNT * 0.22) * Math.PI) * phi;
      }

      const shellJitter = (Math.random() - 0.5) * (isRimParticle ? 0.55 : 0.85);
      const r = radius + shellJitter;

      planetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      planetPositions[i3 + 1] = r * Math.cos(phi);
      planetPositions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      currentPositions[i3] = initialPositions[i3];
      currentPositions[i3 + 1] = initialPositions[i3 + 1];
      currentPositions[i3 + 2] = initialPositions[i3 + 2];

      colors[i3] = 1.0;
      colors[i3 + 1] = 1.0;
      colors[i3 + 2] = 1.0;
    }

    // 3. Create Points Geometry with Vertex Colors
    const geometry = new THREE.BufferGeometry();
    const posAttribute = new THREE.BufferAttribute(currentPositions, 3);
    const colorAttribute = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('position', posAttribute);
    geometry.setAttribute('color', colorAttribute);

    // Bright, crisp glowing star texture
    const canvasPoint = document.createElement('canvas');
    canvasPoint.width = 32;
    canvasPoint.height = 32;
    const ctxPoint = canvasPoint.getContext('2d');

    const grad = ctxPoint.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0.0, '#ffffff');
    grad.addColorStop(0.35, '#ffffff');
    grad.addColorStop(0.65, 'rgba(215, 238, 255, 0.7)');
    grad.addColorStop(0.9, 'rgba(140, 200, 255, 0.25)');
    grad.addColorStop(1.0, 'rgba(140, 200, 255, 0.0)');

    ctxPoint.fillStyle = grad;
    ctxPoint.fillRect(0, 0, 32, 32);
    const pointTexture = new THREE.CanvasTexture(canvasPoint);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.055 : 0.072,
      map: pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    // Lowered position from above
    points.position.set(0, isMobile ? -1.2 : -1.85, -1.0);
    scene.add(points);

    // 4. Smooth Interpolation State
    let smoothProgress = 0;
    let clock = new THREE.Clock();

    // 5. Render Loop with Faster Motion & Cap-Shaped Bottom Fade
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const currentScrollProg = progressRef.current;

      const targetProg = Math.min(1.0, Math.max(0.0, currentScrollProg / 0.80));
      smoothProgress += (targetProg - smoothProgress) * 0.08;

      const easeP = smoothProgress * smoothProgress * (3 - 2 * smoothProgress);

      const posArray = posAttribute.array;
      const colorArray = colorAttribute.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        const startX = initialPositions[i3];
        const startY = initialPositions[i3 + 1];
        const startZ = initialPositions[i3 + 2];

        const targetX = planetPositions[i3];
        const targetY = planetPositions[i3 + 1];
        const targetZ = planetPositions[i3 + 2];

        const currentX = THREE.MathUtils.lerp(startX, targetX, easeP);
        const currentY = THREE.MathUtils.lerp(startY, targetY, easeP);
        const currentZ = THREE.MathUtils.lerp(startZ, targetZ, easeP);

        // Ambient floating noise
        const floatX = Math.sin(elapsedTime * 0.65 + i) * 0.02 * (1 - easeP * 0.9);
        const floatY = Math.cos(elapsedTime * 0.75 + i) * 0.02 * (1 - easeP * 0.9);

        posArray[i3] = currentX + floatX;
        posArray[i3 + 1] = currentY + floatY;
        posArray[i3 + 2] = currentZ;

        // Limb Brightening / Center Text Clarity
        const r2D = Math.sqrt(currentX * currentX + currentY * currentY);
        const normalizedR = Math.min(1.0, r2D / (radius * 0.95));
        const rimIntensity = Math.min(1.0, Math.max(0.12, Math.pow(normalizedR, 1.8) * 0.9 + 0.12));

        // Outer-Curve Cap-Shaped Bottom Dissolution
        const xRatio = currentX / radius;
        const capBaselineY = -1.4 - (xRatio * xRatio) * 2.2;

        let capFade = 1.0;
        if (currentY < capBaselineY) {
          const depth = capBaselineY - currentY;
          capFade = Math.max(0.0, Math.min(1.0, 1.0 - depth / 1.8));
          capFade = Math.pow(capFade, 1.4);
        }

        const finalIntensity = rimIntensity * capFade;

        colorArray[i3] = finalIntensity;
        colorArray[i3 + 1] = finalIntensity;
        colorArray[i3 + 2] = finalIntensity;
      }

      posAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      // Faster celestial rotation in opposite direction (0.045)
      points.rotation.y = -elapsedTime * 0.045;
      points.rotation.x = 0;
      points.rotation.z = 0;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Intersection Observer (0% GPU usage when scrolled offscreen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      pointTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        WebkitMaskImage:
          'radial-gradient(ellipse 100% 75% at 50% 20%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 58%, rgba(0, 0, 0, 0.8) 72%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0) 98%)',
        maskImage:
          'radial-gradient(ellipse 100% 75% at 50% 20%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 58%, rgba(0, 0, 0, 0.8) 72%, rgba(0, 0, 0, 0.25) 85%, rgba(0, 0, 0, 0) 98%)',
      }}
      aria-hidden="true"
    />
  );
}
