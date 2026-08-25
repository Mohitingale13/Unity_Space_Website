import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TimelineParticleDome from './TimelineParticleDome';

/**
 * Scroll-Driven Satellite Launch Timeline
 * - 3D Morphing Particle Field: Accelerates on scroll and condenses to form the upper semi-circle planet horizon dome
 * - Strict Fixed 1957 - 2030 Timeline with 74 discrete yearly ticks
 * - Strict constant, uniform pacing across all years
 * - Upright Roman Serif Typography (Newsreader / Lora / Merriweather)
 * - Exact "1957 to 2012" offset layout matching reference image
 * - Balanced gap between Title and Stage Content
 * - Single-line ">1 Million" and neatly proportioned figures
 * - Synchronous locked timeline bar: Yellow fill layer strictly locked with scrubber notch (zero lag/overshoot)
 * - Did You Know finale when timeline completes at 2030
 */

const START_YEAR = 1957;
const END_YEAR = 2030;
const TOTAL_YEARS = END_YEAR - START_YEAR; // 73 intervals (74 years / ticks)
const TIMELINE_END_PROGRESS = 0.80;        // Progress at which year 2030 is reached

// Content Stages mapped to strictly linear year ranges
const STAGES = [
  {
    id: 'era-1957',
    startYear: 1957,
    endYear: 2012,
    startProg: 0.0,
    endProg: ((2012 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    type: 'split',
    leftLabel: 'From',
    leftBig1: '1957',
    leftSub: 'to',
    leftBig2: '2012',
    rightLabel: 'Only around',
    rightBig: '150',
    rightDescLines: ['satellites were launched', 'annually'],
  },
  {
    id: 'era-2013',
    startYear: 2013,
    endYear: 2019,
    startProg: ((2012 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    endProg: ((2019 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    type: 'split',
    leftLabel: 'In',
    leftBig1: '2013',
    leftSub: null,
    leftBig2: null,
    rightLabel: null,
    rightBig: '210',
    rightDescLines: [
      'satellites launched, marking the beginning',
      'of an exponential growth trend',
    ],
  },
  {
    id: 'era-2020',
    startYear: 2020,
    endYear: 2021,
    startProg: ((2019 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    endProg: ((2021 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    type: 'split',
    leftLabel: 'By',
    leftBig1: '2020',
    leftSub: null,
    leftBig2: null,
    rightLabel: 'The number increased to',
    rightBig: '1,200',
    rightDescLines: ['satellites launched'],
  },
  {
    id: 'era-2022',
    startYear: 2022,
    endYear: 2023,
    startProg: ((2021 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    endProg: ((2023 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    type: 'split',
    leftLabel: 'Only two years later, in',
    leftBig1: '2022',
    leftSub: null,
    leftBig2: null,
    rightLabel: 'Launches nearly doubled to',
    rightBig: '2,470',
    rightDescLines: ['satellites'],
  },
  {
    id: 'era-2024',
    startYear: 2024,
    endYear: 2027,
    startProg: ((2023 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    endProg: ((2027 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    type: 'split',
    leftLabel: 'Looking to the',
    leftBig1: 'Future',
    leftSub: null,
    leftBig2: null,
    rightLabel: 'In the coming years,',
    rightBig: '>1 Million',
    rightDescLines: [
      'satellites could fill our skies as launch',
      'costs drop, private investment surges, and',
      'technology advances.',
    ],
  },
  {
    id: 'era-2028',
    startYear: 2028,
    endYear: 2030,
    startProg: ((2027 - START_YEAR + 0.5) / TOTAL_YEARS) * TIMELINE_END_PROGRESS,
    endProg: TIMELINE_END_PROGRESS,
    type: 'paragraph',
    bodyText: 'Well over a million satellites could fill our night sky in just a matter of years as launch technology gets cheaper along with technological breakthroughs and private sector involvement. Annual launches could hit millions, boosting connectivity but straining space sustainability.',
  },
  {
    id: 'era-didyouknow',
    startYear: 2030,
    endYear: 2030,
    startProg: TIMELINE_END_PROGRESS,
    endProg: 1.0,
    type: 'fact',
  },
];

const MILESTONES = [1957, 2013, 2020, 2022, 2024, 2028, 2030];

export default function SatelliteTimeline() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Track window scroll and compute pinned progress (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const currentProg = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      setProgress(currentProg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bar scrubber progress: exactly linear across 1957 to 2030 (0 to 1)
  const barScrubProgress = Math.min(1.0, Math.max(0, progress / TIMELINE_END_PROGRESS));

  // Current Year strictly between 1957 and 2030 (each tick = 1 year, uniform pace)
  const currentYear = Math.min(END_YEAR, Math.max(START_YEAR, Math.round(START_YEAR + barScrubProgress * TOTAL_YEARS)));

  // Timeline Bar Entrance and Exit Animation Calculation
  let barTranslateY = 0;
  let barOpacity = 1;

  if (progress < 0.04) {
    const enterT = progress / 0.04;
    barTranslateY = (1 - enterT) * 80;
    barOpacity = enterT;
  } else if (progress > TIMELINE_END_PROGRESS) {
    const exitT = Math.min(1, (progress - TIMELINE_END_PROGRESS) / 0.06);
    barTranslateY = exitT * 90;
    barOpacity = 1 - exitT;
  }

  // Step milestone jump on arrow buttons
  const handleStep = (direction) => {
    if (!sectionRef.current) return;
    
    let targetYear = currentYear;
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

  // Total ticks: 74 ticks (one per year from 1957 to 2030)
  const totalTicks = TOTAL_YEARS + 1;
  const isLateStage = progress >= TIMELINE_END_PROGRESS;

  return (
    <section
      ref={sectionRef}
      id="satellite-timeline"
      style={{
        position: 'relative',
        height: '900vh', // Uniform, deliberate scroll budget
        width: '100%',
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
          justifyContent: 'center', // Center content harmoniously together
          alignItems: 'center',
          overflow: 'hidden',
          background: 'transparent',
          zIndex: 10,
        }}
      >
        {/* 3D Morphing Particle Field to Planet Horizon Semi-Circle */}
        <TimelineParticleDome progress={progress} />

        {/* TOP: Fixed Display Title (Balanced, natural gap above stage content) */}
        <header
          style={{
            position: 'relative',
            zIndex: 5,
            marginBottom: 'clamp(2.5rem, 5.5vh, 4rem)',
            textAlign: 'center',
            opacity: isLateStage ? 0 : 1,
            transform: isLateStage ? 'translateY(-15px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              fontWeight: 400,
              color: '#ffffff',
              fontStyle: 'normal',
              lineHeight: 1.22,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            }}
          >
            In a Nutshell:<br />
            Satellite Launches
          </h2>
        </header>

        {/* CENTER: Pinned Dynamic Stage Content Stack (Pure Upright Editorial Serif) */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '1050px',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '260px',
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

                      {/* If stage has two stacked years (1957 to 2012), stack them tightly with "to" positioned on right */}
                      {stage.leftBig2 ? (
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 className="timeline-giant-number" style={{ lineHeight: 0.92 }}>
                            {stage.leftBig1}
                          </h3>
                          {stage.leftSub && (
                            <span
                              style={{
                                position: 'absolute',
                                right: '-2.4rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                                color: '#ffffff',
                                fontWeight: 400,
                                fontStyle: 'normal',
                              }}
                            >
                              {stage.leftSub}
                            </span>
                          )}
                          <h3 className="timeline-giant-number" style={{ lineHeight: 0.92 }}>
                            {stage.leftBig2}
                          </h3>
                        </div>
                      ) : (
                        <h3 className="timeline-giant-number">{stage.leftBig1}</h3>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="timeline-col" style={{ maxWidth: '440px' }}>
                      {stage.rightLabel && (
                        <span className="timeline-label">{stage.rightLabel}</span>
                      )}
                      <h3 className="timeline-giant-number">{stage.rightBig}</h3>
                      {stage.rightDescLines && (
                        <p className="timeline-desc">
                          {stage.rightDescLines.map((line, idx) => (
                            <span key={idx} style={{ display: 'block' }}>{line}</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Paragraph Stage (2028 - 2030 Sustainability) */}
                {stage.type === 'paragraph' && (
                  <div style={{ maxWidth: '800px', textAlign: 'center', margin: '0 auto' }}>
                    <p className="timeline-long-text">{stage.bodyText}</p>
                  </div>
                )}

                {/* Did You Know Finale (Matches Reference Image) */}
                {stage.type === 'fact' && (
                  <div
                    style={{
                      maxWidth: '920px',
                      textAlign: 'center',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Royal Blue [ DID YOU KNOW? ] Badge */}
                    <div className="timeline-pill-tag">
                      DID YOU KNOW?
                    </div>

                    {/* Large Editorial Serif Quote with [New York] and [Montreal] Blue Badges */}
                    <h2 className="timeline-fact-text">
                      Most satellite constellations are just 500 km above our heads. That’s approximately the distance from{' '}
                      <span className="timeline-badge-blue">New York</span> to{' '}
                      <span className="timeline-badge-blue">Montreal</span>.
                    </h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM: Sliding Timeline Bar with Arrow Buttons & Synchronously Locked Fill */}
        <footer
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 'clamp(1.8rem, 4.5vh, 3.2rem)',
            transform: `translateY(${barTranslateY}px)`,
            opacity: barOpacity,
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            visibility: barOpacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <div
            style={{
              width: 'min(94%, 820px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            {/* Left Chevron Button (Solid Royal Blue) */}
            <button
              onClick={() => handleStep(-1)}
              aria-label="Previous timeline milestone"
              style={{
                width: '44px',
                height: '44px',
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
              <ChevronLeft size={20} />
            </button>

            {/* Central Colorful Timeline Bar Container */}
            <div
              style={{
                flex: 1,
                position: 'relative',
              }}
            >
              {/* Scrubber Tooltip Badge with Downward Pointer - Strictly Synced (Zero Lag) */}
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
                {/* White Capsule Pill with Dark Text (Strict Numeric Year: 1957 ... 2030) */}
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
                  height: '44px',
                  borderRadius: '8px',
                  background: '#1d4ed8',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Yellow/Amber Active Fill Layer - 100% Synchronously Locked behind White Scrubber Notch */}
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

                {/* Discrete Vertical White Ticks: Exactly 74 ticks (one per year 1957 to 2030) */}
                {Array.from({ length: totalTicks }).map((_, i) => {
                  const tickYear = START_YEAR + i;
                  const isMilestone = MILESTONES.includes(tickYear);
                  const isDecade = tickYear % 10 === 0;

                  return (
                    <div
                      key={i}
                      style={{
                        flex: '1 1 0',
                        height: isMilestone ? '26px' : isDecade ? '22px' : '16px',
                        margin: '0 0.5px',
                        borderRadius: '1px',
                        background: '#ffffff',
                        opacity: isMilestone ? 1 : isDecade ? 0.9 : 0.6,
                        boxShadow: isMilestone ? '0 0 4px #ffffff' : 'none',
                        width: isMilestone ? '3.5px' : '2px',
                        position: 'relative',
                        zIndex: 2,
                      }}
                      title={`${tickYear}`}
                    />
                  );
                })}

                {/* Scrubber Vertical White Notch Indicator - 100% Locked with Fill */}
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${barScrubProgress * 100}% - 1.5px)`,
                    top: 4,
                    bottom: 4,
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

            {/* Right Chevron Button (Solid Royal Blue) */}
            <button
              onClick={() => handleStep(1)}
              aria-label="Next timeline milestone"
              style={{
                width: '44px',
                height: '44px',
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
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
