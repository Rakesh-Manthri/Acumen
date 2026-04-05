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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemWidth = isMobile ? 210 : 360;
  const gap = isMobile ? 130 : 180;

  const animatedScrollX = useRef(0);
  const targetScrollX = useRef(0);

  useEffect(() => {
    let animationFrameId;
    const renderLoop = () => {
      if (!isDraggingRef.current) {
        targetScrollX.current += isMobile ? 0.8 : 1.2;
      }
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
    const dragMultiplier = isMobile ? 1.0 : 1.5;
    targetScrollX.current = prevScrollX.current - delta * dragMultiplier;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <div style={{
      minHeight: isMobile ? '100vh' : '110vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F1EFE9', // Light Theme Background
      position: 'relative',
      overflowX: 'hidden',
      overflowY: isMobile ? 'hidden' : 'auto',
      paddingTop: '6rem'
    }}>
      {/* Subtle Background Accent */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vmax', height: '70vmax',
        background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <h1 style={{
        marginTop: '2rem',
        marginBottom: '-5rem',
        textAlign: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: 800,
        color: '#000000', // Sharp Black
        letterSpacing: '-0.02em',
        zIndex: 2,
        position: 'relative'
      }}>
        Event Schedule
      </h1>

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
          height: '600px',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: isMobile ? 'none' : 'pan-y',
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

          const baseSpread = isMobile ? 140 : 280;
          const exponentialShift = baseSpread * Math.log(1 + absDist * 1.5);
          const translateX = Math.sign(normalizedDistance) * -exponentialShift;

          const scale = Math.max(0, 1 - absDist * 0.1 - Math.pow(absDist, 1.4) * 0.1);
          const zIndex = 100 - Math.round(absDist * 10);
          const opacity = absDist >= 2.5 ? Math.max(0, 1 - (absDist - 2.5) * 2) : 1;

          const clipY = Math.min(30, Math.pow(absDist, 1.4) * 7);
          const clipPath = `inset(${clipY}% 0% round 24px)`; // Increased roundness for light theme

          // Smoother lighting for light theme
          const brightness = Math.max(0.6, 1 - absDist * 0.2);

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
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                clipPath: clipPath,
                overflow: 'hidden',
                backgroundColor: '#ffffff', // White base for images
                boxShadow: absDist < 0.5 ? '0 30px 60px rgba(0,0,0,0.12)' : 'none',
                filter: `brightness(${brightness})`,
                transition: 'filter 0.3s ease'
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

              {/* Light Theme Metadata Block */}
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '-4.5rem' : '-5.5rem',
                left: 0,
                width: '100%',
                textAlign: 'center',
                opacity: absDist < 0.6 ? 1 - absDist * 1.8 : 0,
                transform: `translateY(${absDist * 12}px)`,
                pointerEvents: 'none'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  color: '#000000', // Black text
                  fontSize: isMobile ? '1.25rem' : '1.75rem',
                  fontWeight: 800,
                  letterSpacing: '-0.01em'
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#666666', // Muted Grey
                  fontSize: isMobile ? '0.75rem' : '0.85rem',
                  marginTop: '0.4rem',
                  letterSpacing: '0.2em',
                  fontWeight: 600,
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