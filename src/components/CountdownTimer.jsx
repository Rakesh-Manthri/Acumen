import { useState, useEffect } from 'react'

const EVENT_DATE = new Date('2026-04-16T09:00:00+05:30')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = EVENT_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, expired: false }
}

const units = ['days', 'hours', 'minutes', 'seconds']
const labels = ['Days', 'Hours', 'Mins', 'Secs']

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (time.expired) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#00f5ff',
          fontSize: '1.2rem',
          letterSpacing: '0.1em',
          animation: 'flicker 2s infinite',
        }}>
           EVENT IS LIVE_
        </p>
      </div>
    )
  }

  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.1rem',
        letterSpacing: '0.15em',
        color: 'rgba(0,245,255,0.7)',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: '1.5rem',
      }}>
         Event Starts In
      </p>

      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 2vw, 1.25rem)',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {units.map((unit, i) => (
          <div key={unit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <div style={{
              background: 'rgba(0, 245, 255, 0.05)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              borderRadius: '12px',
              padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2rem)',
              minWidth: 'clamp(70px, 12vw, 100px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0,245,255,0.08), inset 0 1px 0 rgba(0,245,255,0.1)',
              animation: 'pulse-glow 3s ease-in-out infinite',
              animationDelay: `${i * 0.4}s`,
            }}>
              {/* Top highlight */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)',
              }} />

              <span style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                color: '#00f5ff',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: '0 0 20px rgba(0,245,255,0.8)',
              }}>
                {pad(time[unit])}
              </span>
            </div>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(148, 163, 184, 0.7)',
            }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
