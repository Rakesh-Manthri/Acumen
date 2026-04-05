import React, { useEffect } from 'react'

export default function Events() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background elements matching the home page */}
      <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vmax', height: '60vmax',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, rgba(0,245,255,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
      }} />
      <div className="grid-bg" style={{
        position: 'absolute', inset: 0,
        opacity: 0.3, pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 8vw, 6rem)',
          fontWeight: 700,
          color: '#f0f4ff',
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          lineHeight: 1
        }}>
          Events
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          color: '#00f5ff',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px rgba(0, 245, 255, 0.4)'
        }}>
          Coming Soon...
        </p>
      </div>
    </div>
  )
}
