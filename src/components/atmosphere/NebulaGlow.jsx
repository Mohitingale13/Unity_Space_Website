export default function NebulaGlow() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 20%, #0d1e52 0%, #061136 45%, #020616 100%)',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Upper Deep Celestial Blue Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '12%',
          width: '80vw',
          height: '80vw',
          maxWidth: '1000px',
          maxHeight: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28, 75, 195, 0.35) 0%, rgba(14, 40, 120, 0.16) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Mid Cosmic Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '-8%',
          width: '75vw',
          height: '75vw',
          maxWidth: '950px',
          maxHeight: '950px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 65, 175, 0.25) 0%, rgba(10, 32, 95, 0.1) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Lower Cosmic Blue / Violet Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '8%',
          width: '75vw',
          height: '75vw',
          maxWidth: '950px',
          maxHeight: '950px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 60, 160, 0.26) 0%, rgba(18, 30, 95, 0.1) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
}
