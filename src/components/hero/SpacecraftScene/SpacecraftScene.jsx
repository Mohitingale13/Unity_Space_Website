import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js Procedural Orbital Spacecraft / Wireframe Node
 * Provides high-performance 60fps 3D visuals with zero external GLB dependencies.
 * Automatically respects mobile viewports and reduced motion preferences.
 */
export default function SpacecraftScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Media query check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 6.5 : 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold orbital elements
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // 1. Central Core: Icosahedron Wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, isMobile ? 1 : 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x66e6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    orbitalGroup.add(coreMesh);

    // 2. Outer Orbital Gyro Rings
    const ringMaterial1 = new THREE.LineBasicMaterial({ color: 0x8b7cff, transparent: true, opacity: 0.6 });
    const ringGeometry1 = new THREE.BufferGeometry();
    const points1 = [];
    const radius1 = 2.0;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points1.push(new THREE.Vector3(Math.cos(theta) * radius1, Math.sin(theta) * radius1, 0));
    }
    ringGeometry1.setFromPoints(points1);
    const ring1 = new THREE.Line(ringGeometry1, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    orbitalGroup.add(ring1);

    const ringMaterial2 = new THREE.LineBasicMaterial({ color: 0x66e6ff, transparent: true, opacity: 0.5 });
    const ringGeometry2 = new THREE.BufferGeometry();
    const points2 = [];
    const radius2 = 2.3;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points2.push(new THREE.Vector3(0, Math.cos(theta) * radius2, Math.sin(theta) * radius2));
    }
    ringGeometry2.setFromPoints(points2);
    const ring2 = new THREE.Line(ringGeometry2, ringMaterial2);
    ring2.rotation.z = Math.PI / 4;
    orbitalGroup.add(ring2);

    // 3. Satellite Node Points
    const satelliteCount = 12;
    const satGeometry = new THREE.BufferGeometry();
    const satPositions = new Float32Array(satelliteCount * 3);
    for (let i = 0; i < satelliteCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.9 + Math.random() * 0.8;
      satPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      satPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      satPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    satGeometry.setAttribute('position', new THREE.BufferAttribute(satPositions, 3));
    const satMaterial = new THREE.PointsMaterial({
      color: 0x66e6ff,
      size: isMobile ? 0.06 : 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const satellites = new THREE.Points(satGeometry, satMaterial);
    orbitalGroup.add(satellites);

    // Mouse Tracking Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.35;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        // Continuous gentle rotation
        coreMesh.rotation.y += 0.003;
        coreMesh.rotation.x += 0.002;
        ring1.rotation.z += 0.005;
        ring2.rotation.x += 0.004;
        satellites.rotation.y -= 0.002;

        // Smooth mouse lag
        orbitalGroup.rotation.y += (targetRotationY - orbitalGroup.rotation.y) * 0.05;
        orbitalGroup.rotation.x += (targetRotationX - orbitalGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry1.dispose();
      ringMaterial1.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      satGeometry.dispose();
      satMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'grab',
      }}
      aria-label="Interactive 3D Orbital Model of Unity Space Engineering Systems"
      role="img"
    />
  );
}
