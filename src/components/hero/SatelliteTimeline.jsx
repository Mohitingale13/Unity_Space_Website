import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TimelineParticleDome from './TimelineParticleDome';

/**
 * Satellite Launch Milestone Stages
 * Historical data accurately reflecting global launch acceleration
 */
const STAGES = [
  {
    id: 'era-1957-2012',
    startYear: 1957,
    endYear: 2012,
    startProg: 0.0,
    endProg: 0.20,
    type: 'split',
    leftLabel: 'From',
    leftValue: '1957',
    connector: 'to',
    leftSub: '2012',
    rightLabel: 'Only around',
    rightValue: '150',
    rightSub: 'satellites were launched annually',
  },
  {
    id: 'era-2013-2019',
    startYear: 2013,
    endYear: 2019,
    startProg: 0.20,
    endProg: 0.40,
    type: 'split',
    leftLabel: 'Between',
    leftValue: '2013',
    connector: 'and',
    leftSub: '2019',
    rightLabel: 'Annual launches averaged',
    rightValue: '450',
    rightSub: 'satellites per year',
  },
  {
    id: 'era-2020-2027',
    startYear: 2020,
    endYear: 2027,
    startProg: 0.40,
    endProg: 0.60,
    type: 'split',
    leftLabel: 'By',
    leftValue: '2020',
    connector: 'to',
    leftSub: '2027',
    rightLabel: 'That number grew to over',
    rightValue: '2,500',
    rightSub: 'satellites annually in low Earth orbit',
  },
  {
    id: 'era-2028-2030',
    startYear: 2028,
    endYear: 2030,
    startProg: 0.60,
    endProg: 0.80,
    type: 'split',
    leftLabel: 'By',
    leftValue: '2028',
    connector: 'to',
    leftSub: '2030',
    rightLabel: 'Projections estimate over',
    rightValue: '5,000+',
    rightSub: 'annual launches and mass constellations',
  },
  {
    id: 'era-didyouknow',
    startYear: 2030,
    endYear: 2030,
    startProg: 0.80,
    endProg: 1.0,
    type: 'fact',
    tag: 'DID YOU KNOW?',
    headline: 'Most satellite constellations are just 500 km above our heads.',
    subheadline: (
      <>
        That&apos;s approximately the distance from{' '}
        <span className="timeline-badge-blue">New York</span> to{' '}
        <span className="timeline-badge-blue">Montreal</span>.
      </>
    ),
  },
];

const MILESTONES = [1957, 1970, 1985, 2000, 2013, 2020, 2028, 2030];
const START_YEAR = 1957;
const END_YEAR = 2030;
const TOTAL_YEARS = END_YEAR - START_YEAR; // 73 years
const TIMELINE_END_PROGRESS = 0.80; // 0.0 -> 0.80 covers 1957 -> 2030; 0.80 -> 1.00 is Did You Know

export default function SatelliteTimeline() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
          
          if (totalScrollable > 0) {
            const currentScroll = -rect.top;
            const rawProgress = currentScroll / totalScrollable;
            const clamped = Math.max(0, Math.min(1, rawProgress));
            setProgress(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute Year strictly proportional to the 0.0 -> 0.80 scroll budget
  let currentYear = START_YEAR;
  let barScrubProgress = 0;

  if (progress < TIMELINE_END_PROGRESS) {
    const timelineFraction = progress / TIMELINE_END_PROGRESS;
    currentYear = Math.min(END_YEAR, Math.floor(START_YEAR + timelineFraction * (TOTAL_YEARS + 0.99)));
    barScrubProgress = Math.max(0, Math.min(1, (currentYear - START_YEAR) / TOTAL_YEARS));
  } else {
    currentYear = END_YEAR;
    barScrubProgress = 1.0;
  }

  // Smooth entry/exit transitions for the bottom scrubber bar
  let barOpacity = 1;
  let barTranslateY = 0;

  if (progress < 0.03) {
    barOpacity = Math.max(0, progress / 0.03);
    barTranslateY = (1 - barOpacity) * 20;
  } else if (progress > 0.96) {
    barOpacity = Math.max(0, (1 - progress) / 0.04);
    barTranslateY = (1 - barOpacity) * 20;
  }

  // Step button handler (jumps directly between key historical milestone decades)
  const handleStep = (direction) => {
    if (!sectionRef.current) return;
    
    let targetYear;
    if (direction > 0) {
      targetYear = MILESTONES.find((y) => y > currentYear) || END_YEAR;
    } else {
      const reversed = [...MILESTONES].reverse();
      targetYear = reversed.find((y) => y < currentYear) || START_YEAR;
    }

    const targetFraction = (targetYear - START_YEAR) / TOTAL_YEARS;
    const targetProg = targetFraction * TIMELINE_END_PROGRESS;
    
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = sectionRef.current.offsetTop + targetProg * scrollableDistance;
    
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const totalTicks = TOTAL_YEARS + 1;
  const isLateStage = progress >= TIMELINE_END_PROGRESS;

  return (
    <section
      ref={sectionRef}
      id="satellite-timeline"
      style={{
        position: 'relative',
        height: '900vh',
        width: '100%',
        backgroundColor: '#040714',
        background: 'transparent',
      }}
      aria-label="Satellite Launches Timeline Story"
    >
      {/* Sticky 100vh Pinned Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'transparent',
          zIndex: 10,
        }}
      >
        {/* 3D Morphing Particle Sphere */}
        <TimelineParticleDome progress={progress} />

        {/* TOP: Fixed Display Title (Elevated cleanly above with no collision) */}
        <header
          style={{
            position: 'relative',
            zIndex: 5,
            marginBottom: isMobile ? 'clamp(1.75rem, 4vh, 2.75rem)' : 'clamp(2.5rem, 5.5vh, 4rem)',
            textAlign: 'center',
            opacity: isLateStage ? 0 : 1,
            transform: isLateStage
              ? 'translateY(-15px)'
              : isMobile
              ? 'translateY(-18px)'
              : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(1.65rem, 4.8vw, 2.15rem)' : 'clamp(1.85rem, 3.2vw, 2.75rem)',
              fontWeight: 400,
              color: '#ffffff',
              fontStyle: 'normal',
              lineHeight: 1.22,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.95)',
            }}
          >
            In a Nutshell:<br />
            Satellite Launches
          </h2>
        </header>

        {/* CENTER: Pinned Dynamic Stage Content Stack */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '1050px',
            padding: '0 clamp(1rem, 4vw, 3rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: isMobile ? '280px' : '260px',
            pointerEvents: 'none',
          }}
        >
          {STAGES.map((stage) => {
            const stageLen = stage.endProg - stage.startProg;
            const localT = stageLen > 0 ? (progress - stage.startProg) / stageLen : 0;
            const isActive = progress >= stage.startProg && progress <= stage.endProg;

            let stageOpacity = 0;
            if (isActive) {
              if (stage.id === 'era-didyouknow') {
                if (localT < 0.1) {
                  stageOpacity = localT / 0.1;
                } else if (localT > 0.92) {
                  stageOpacity = (1 - localT) / 0.08;
                } else {
                  stageOpacity = 1;
                }
              } else {
                if (localT < 0.12) {
                  stageOpacity = localT / 0.12;
                } else if (localT > 0.88) {
                  stageOpacity = (1 - localT) / 0.12;
                } else {
                  stageOpacity = 1;
                }
              }
            }

            const translateY = isActive
              ? localT < 0.12
                ? (1 - localT / 0.12) * 12
                : localT > 0.88
                ? -((localT - 0.88) / 0.12) * 12
                : 0
              : 20;

            return (
              <div
                key={stage.id}
                style={{
                  position: 'absolute',
                  width: '100%',
                  opacity: stageOpacity,
                  transform: `translateY(${translateY}px)`,
                  transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  visibility: stageOpacity > 0.01 ? 'visible' : 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Milestone Split Layout */}
                {stage.type === 'split' && (
                  <div className="timeline-stage-grid">
                    {/* Left Column */}
                    <div className="timeline-col">
                      {stage.leftLabel && (
                        <span className="timeline-label">{stage.leftLabel}</span>
                      )}
                      <div className="timeline-giant-number">{stage.leftValue}</div>
                      {stage.connector && (
                        <span className="timeline-connector">{stage.connector}</span>
                      )}
                      {stage.leftSub && (
                        <div className="timeline-giant-number">{stage.leftSub}</div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="timeline-col">
                      {stage.rightLabel && (
                        <span className="timeline-sub-label">{stage.rightLabel}</span>
                      )}
                      <div className="timeline-giant-number">{stage.rightValue}</div>
                      {stage.rightSub && (
                        <p className="timeline-desc">{stage.rightSub}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Did You Know Finale Layout */}
                {stage.type === 'fact' && (
                  <div className="timeline-fact-card">
                    {stage.tag && (
                      <div className="timeline-pill-tag">{stage.tag}</div>
                    )}
                    <h3 className="timeline-fact-text">
                      {stage.headline}
                      <br />
                      {stage.subheadline}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM: Perfectly Centered Synchronous Scrubbing Timeline Bar */}
        <footer
          style={{
            position: 'absolute',
            bottom: isMobile ? 'clamp(1.25rem, 3.5vh, 2rem)' : 'clamp(1.5rem, 3.5vh, 2.5rem)',
            left: 0,
            right: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 clamp(0.75rem, 3vw, 1.5rem)',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            zIndex: 10,
            transform: `translateY(${barTranslateY}px)`,
            opacity: barOpacity,
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            visibility: barOpacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '0.45rem' : '0.65rem',
              boxSizing: 'border-box',
            }}
          >
            {/* Left Chevron Button */}
            <button
              onClick={() => handleStep(-1)}
              aria-label="Previous timeline milestone"
              style={{
                width: isMobile ? '38px' : '44px',
                height: isMobile ? '38px' : '44px',
                flexShrink: 0,
                borderRadius: '8px',
                background: '#1d4ed8',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(29, 78, 216, 0.4)',
                transition: 'background 0.2s ease, transform 0.1s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1d4ed8')}
            >
              <ChevronLeft size={isMobile ? 18 : 20} />
            </button>

            {/* Central Colorful Timeline Bar Container */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
              }}
            >
              {/* Scrubber Tooltip Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-34px',
                  left: `${barScrubProgress * 100}%`,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 4,
                  pointerEvents: 'none',
                  willChange: 'left',
                }}
              >
                {/* White Capsule Pill with Dark Text */}
                <div
                  style={{
                    background: '#ffffff',
                    color: '#0f172a',
                    fontFamily: 'var(--font-display), var(--font-mono), sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '2px 10px',
                    borderRadius: '12px',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.4,
                  }}
                >
                  {currentYear}
                </div>

                {/* Downward White Triangle Pointer */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #ffffff',
                    marginTop: '-1px',
                  }}
                />
              </div>

              {/* Main Bar Capsule: Royal Blue base track */}
              <div
                style={{
                  width: '100%',
                  height: isMobile ? '38px' : '44px',
                  borderRadius: '8px',
                  background: '#1d4ed8',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Yellow/Amber Active Fill Layer */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${barScrubProgress * 100}%`,
                    background: 'linear-gradient(to right, #d97706 0%, #eab308 85%, #f59e0b 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                    zIndex: 1,
                    willChange: 'width',
                  }}
                />

                {/* Discrete Vertical White Ticks: Exactly 74 ticks */}
                {Array.from({ length: totalTicks }).map((_, i) => {
                  const tickYear = START_YEAR + i;
                  const isMilestone = MILESTONES.includes(tickYear);
                  const isDecade = tickYear % 10 === 0;

                  return (
                    <div
                      key={i}
                      style={{
                        flex: '1 1 0',
                        height: isMilestone ? (isMobile ? '22px' : '26px') : isDecade ? (isMobile ? '18px' : '22px') : (isMobile ? '13px' : '16px'),
                        margin: '0 0.25px',
                        borderRadius: '1px',
                        background: '#ffffff',
                        opacity: isMilestone ? 1 : isDecade ? 0.9 : 0.6,
                        boxShadow: isMilestone ? '0 0 4px #ffffff' : 'none',
                        width: isMilestone ? '3px' : '1.5px',
                        position: 'relative',
                        zIndex: 2,
                      }}
                      title={`${tickYear}`}
                    />
                  );
                })}

                {/* Scrubber Vertical White Notch Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${barScrubProgress * 100}% - 1.5px)`,
                    top: 3,
                    bottom: 3,
                    width: '3px',
                    background: '#ffffff',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px #ffffff',
                    zIndex: 3,
                    willChange: 'left',
                  }}
                />
              </div>
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={() => handleStep(1)}
              aria-label="Next timeline milestone"
              style={{
                width: isMobile ? '38px' : '44px',
                height: isMobile ? '38px' : '44px',
                flexShrink: 0,
                borderRadius: '8px',
                background: '#1d4ed8',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(29, 78, 216, 0.4)',
                transition: 'background 0.2s ease, transform 0.1s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1d4ed8')}
            >
              <ChevronRight size={isMobile ? 18 : 20} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
