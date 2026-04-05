import React, { useRef, useState, useEffect } from 'react';

const EVENTS = [
  { id: 1, title: 'Opening Ceremony', subtitle: 'April 16 | 09:00 AM', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 2, title: 'Code Genesis', subtitle: 'April 16 | 12:00 PM', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  { id: 3, title: 'Cyber Defense', subtitle: 'April 17 | 10:00 AM', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
  { id: 4, title: 'AI Hackathon', subtitle: 'April 17 | 02:00 PM', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { id: 5, title: 'Web3 Summit', subtitle: 'April 18 | 11:00 AM', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80' },
  { id: 6, title: 'Robotics Expo', subtitle: 'April 19 | 09:00 AM', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80' },
  { id: 7, title: 'Closing Gala', subtitle: 'April 19 | 06:00 PM', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80' }
];

export default function Events() {
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);
  const prevScrollX = useRef(0);
  const isDraggingRef = useRef(false);

  // Responsive event listener setup
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive physics configuration
  const itemWidth = isMobile ? 260 : 360;
  const gap = isMobile ? 150 : 220;

  const animatedScrollX = useRef(0);
  const targetScrollX = useRef(0);

  // Smooth animation loop
  useEffect(() => {
    let animationFrameId;
    const renderLoop = () => {
      // Auto-scroll logic happens slower on mobile to preserve readable pace
      if (!isDraggingRef.current) {
        targetScrollX.current += isMobile ? 0.8 : 1.2;
      }

      // Lerp (Linear Interpolation)
      animatedScrollX.current += (targetScrollX.current - animatedScrollX.current) * 0.08;

      setScrollX(animatedScrollX.current);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    prevScrollX.current = targetScrollX.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = clientX - startX.current;

    // Sensitivity scale depending on screen
    const dragMultiplier = isMobile ? 1.0 : 1.5;
    targetScrollX.current = prevScrollX.current - delta * dragMultiplier;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <div style={{
      minHeight: '125vh', // Slightly scrollable page
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#050510',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: '6rem'
    }}>
      {/* Dynamic Background Glow */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vmax', height: '70vmax',
        background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <h1 style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '0.02em',
        zIndex: 2,
        position: 'relative'
      }}>
        Event Schedule
      </h1>

      {/* Infinite Panoramic Slider Track */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          height: '600px', // Strict container to anchor drags securely inside scrollable view
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y', // Allow browser page scrolling vertically
          zIndex: 2
        }}
      >
        {EVENTS.map((event, index) => {
          const loopLength = EVENTS.length * gap;
          const targetXPosition = index * gap;
          const rawDistance = animatedScrollX.current - targetXPosition;
          const wrappedDistance = ((rawDistance + loopLength / 2) % loopLength + loopLength) % loopLength - loopLength / 2;

          const normalizedDistance = wrappedDistance / gap;
          const absDist = Math.abs(normalizedDistance);

          // Layout scaling values based on screen width target requests: (5 for desktop, 3 for mobile)
          const translateXShift = isMobile ? 0.65 : 0.6; // Push overlapping elements
          const translateX = normalizedDistance * -itemWidth * translateXShift;

          const scale = Math.max(0.3, 1 - absDist * 0.25);
          const zIndex = 100 - Math.round(absDist * 10);

          // Ensure Mobile fades faster to maintain exactly a 3-card primary view focus, Desktop slower for 5
          const fadeoutMultiplier = isMobile ? 0.1 : 0.1;
          const opacity = Math.max(0, 1 - absDist * fadeoutMultiplier);

          const clipY = Math.min(25, absDist * 12);
          const clipX = Math.min(10, absDist * 6);
          const clipPath = `inset(${clipY}% ${clipX}% round 16px)`;

          const brightness = Math.max(0.2, 1 - absDist * 0.4);

          return (
            <div
              key={event.id}
              style={{
                position: 'absolute',
                width: `${itemWidth}px`,
                height: `${itemWidth * 1.3}px`,
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                willChange: 'transform, opacity, clip-path',
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              {/* Asset Mask */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                clipPath: clipPath,
                overflow: 'hidden',
                backgroundColor: 'black',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                filter: `brightness(${brightness})`,
                transition: 'none'
              }}>
                <img
                  src={event.img}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                  draggable={false}
                />
              </div>

              {/* Dynamic Metadata Block */}
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '-4rem' : '-5rem',
                left: 0,
                width: '100%',
                textAlign: 'center',
                opacity: absDist < 0.6 ? 1 - absDist * 1.6 : 0,
                transform: `translateY(${absDist * 15}px)`,
                pointerEvents: 'none'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  color: 'white',
                  fontSize: isMobile ? '1.2rem' : '1.6rem',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#00f5ff',
                  fontSize: isMobile ? '0.8rem' : '0.95rem',
                  marginTop: '0.5rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  {event.subtitle}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
