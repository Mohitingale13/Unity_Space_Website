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
      }}
      aria-hidden="true"
    >
      {/* Upper Deep Space Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '70vw',
          height: '70vw',
          maxWidth: '900px',
          maxHeight: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 45, 110, 0.22) 0%, rgba(10, 25, 70, 0.08) 50%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Lower Subtle Cosmic Violet Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '5%',
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 25, 80, 0.16) 0%, rgba(15, 20, 60, 0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
}
