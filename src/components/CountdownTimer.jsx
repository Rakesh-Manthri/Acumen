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
          color: '#000',
          fontSize: '1.2rem',
          fontWeight: '700',
          letterSpacing: '0.2em',
        }}>
           THE EVENT IS LIVE
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 2.5vw, 2rem)',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {units.map((unit, i) => (
          <div key={unit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
          }}>
            <div style={{
              background: '#ffffff', // Pure white card
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '20px',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              minWidth: 'clamp(80px, 15vw, 120px)',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)', // Very subtle shadow
              transition: 'transform 0.3s ease',
            }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                color: '#000000', // Sharp black
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {pad(time[unit])}
              </span>
            </div>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#999999', // Muted grey
            }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}