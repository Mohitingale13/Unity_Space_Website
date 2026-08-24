/**
 * Unity Space - Asset Manifest
 * Tracks availability and fallbacks for all visual, audio, 3D, and telemetry assets.
 * Authentic assets will seamlessly override procedural or remote fallbacks when added to /public.
 */
export const assetsManifest = {
  brand: {
    logoSvg: true,
    logoPng: false, // will fallback to SVG aerospace emblem
  },
  hero: {
    spacecraftGlb: null, // null triggers high-performance procedural Three.js orbital wireframe
    heroVideo: null,
  },
  team: {
    // Member image source strategy: local public image if available, else curated authentic portrait
    useRemoteFallbacks: true,
  },
  projects: {
    trajectoryVideo: null,
    useRemoteFallbacks: true,
  },
  audio: {
    ambientTelemetry: null,
  }
};
