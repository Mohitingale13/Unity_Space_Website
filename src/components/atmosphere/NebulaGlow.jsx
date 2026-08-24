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
      {/* Primary Cyan Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '60vw',
          height: '60vw',
          maxWidth: '850px',
          maxHeight: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 230, 255, 0.045) 0%, rgba(102, 230, 255, 0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary Violet Deep Space Nebula */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          maxWidth: '750px',
          maxHeight: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 124, 255, 0.04) 0%, rgba(139, 124, 255, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
}
