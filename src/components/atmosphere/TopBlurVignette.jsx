/**
 * Progressive Top Depth-of-Field Blur Vignette
 * Replicates the United Nations Aerospace progressive blur effect:
 * As content scrolls up into the top header zone, it progressively diffuses,
 * blurs, and fades out with multi-stage gradient backdrop filtering.
 */
export default function TopBlurVignette() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'clamp(90px, 14vh, 150px)',
        pointerEvents: 'none',
        zIndex: 900, // Sits directly above page content and below floating navbar (z: 1000)
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Stage 1: Ultra-deep soft blur mask (Top 0% - 60%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 45%, rgba(0, 0, 0, 0) 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 45%, rgba(0, 0, 0, 0) 90%)',
        }}
      />

      {/* Stage 2: Secondary medium diffusion layer (Top 0% - 100%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Stage 3: Smooth atmospheric vignette gradient fade into celestial space blue */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(4, 8, 26, 0.85) 0%, rgba(4, 8, 26, 0.45) 45%, rgba(4, 8, 26, 0.12) 75%, transparent 100%)',
        }}
      />
    </div>
  );
}
