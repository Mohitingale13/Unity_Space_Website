import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js Spacecraft Procedural Orbital Wireframe
 * Mobile GPU Optimized:
 * - IntersectionObserver: Automatically stops Three.js render loop when scrolled off-screen (0% GPU usage)
 * - Device Pixel Ratio capped at 1.5 to prevent retina pixel-fill overhead on mobile GPUs
 * - Low-poly geometry with zero texture memory footprint
 */
export default function SpacecraftScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId = null;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768, // Antialias only on desktop for maximum mobile fps
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Strict pixel ratio cap: max 1.5 prevents mobile retina fill-rate strain
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Procedural Spacecraft Mesh Core (Lightweight Wireframe)
    const spacecraftGroup = new THREE.Group();
    scene.add(spacecraftGroup);

    // Core Icosahedron Wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x66e6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    spacecraftGroup.add(coreMesh);

    // Outer Primary Gyroscope Ring
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.02, 12, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b7cff,
      transparent: true,
      opacity: 0.5,
    });
    const gyroRing = new THREE.Mesh(ringGeometry, ringMaterial);
    spacecraftGroup.add(gyroRing);

    // Secondary Inclined Ring
    const innerRingGeometry = new THREE.TorusGeometry(2.0, 0.015, 12, 40);
    const innerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x66e6ff,
      transparent: true,
      opacity: 0.35,
    });
    const innerGyroRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerGyroRing.rotation.x = Math.PI / 3;
    spacecraftGroup.add(innerGyroRing);

    // Orbital Satellite Nodes (Small spheres)
    const satelliteGroup = new THREE.Group();
    const satGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 3; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i * Math.PI * 2) / 3;
      sat.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
      satelliteGroup.add(sat);
    }
    spacecraftGroup.add(satelliteGroup);

    // 3. Mouse / Touch Parallax Interpolation
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 4. Mobile GPU Saver: Pause rendering when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          renderLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 5. Optimized Animation Render Loop
    let clock = new THREE.Clock();

    const renderLoop = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      // Smooth continuous orbital rotation
      coreMesh.rotation.y += delta * 0.3;
      coreMesh.rotation.x += delta * 0.15;
      gyroRing.rotation.z += delta * 0.2;
      innerGyroRing.rotation.y += delta * 0.25;
      satelliteGroup.rotation.z -= delta * 0.4;

      // Parallax damping
      spacecraftGroup.rotation.y += (targetRotationY - spacecraftGroup.rotation.y) * 0.05;
      spacecraftGroup.rotation.x += (targetRotationX - spacecraftGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 6. Resize Handler
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
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Memory cleanup
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'grab',
        touchAction: 'pan-y', // Lets user scroll page seamlessly over the 3D canvas
      }}
      aria-label="3D Spacecraft Orbital Simulation"
    />
  );
}
