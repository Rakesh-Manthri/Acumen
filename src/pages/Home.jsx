import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

const mentors = [
  { name: 'Dr. S. V. Ramana', role: 'Principal', initial: 'R' },
  { name: 'Dr. K. Ram Mohan Rao', role: 'HOD, Dept. of IT', initial: 'K' },
  { name: 'Mr. Nelaturi David Raju', role: 'Faculty Coordinator', initial: 'N' },
  { name: 'Mr. Srinivas Chakravarthy', role: 'Faculty Coordinator', initial: 'S' },
]

const coordinators = [
  { name: 'Hima Atluri', role: 'Overall Acumen Coordinator', initial: 'H' },
  { name: 'Pavan Kalyan', role: 'Acumen IT Coordinator', initial: 'P' },
  { name: 'Hrishitha', role: 'Coordinator', initial: 'H' },
  { name: 'Bhavana', role: 'Coordinator', initial: 'B' },
]

function PersonCard({ name, role, initial, accent = '#00f5ff' }) {
  return (
    <div style={{
      background: 'rgba(8,8,32,0.7)',
      border: `1px solid rgba(0,245,255,0.15)`,
      borderRadius: '16px',
      padding: '1.5rem 1.25rem',
      textAlign: 'center',
      minWidth: '160px',
      maxWidth: '190px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      flexShrink: 0,
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,245,255,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: 64, height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.2))',
        border: '2px solid rgba(0,245,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.5rem',
        color: '#00f5ff',
        boxShadow: '0 0 20px rgba(0,245,255,0.15)',
      }}>
        {initial}
      </div>
      <div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: '#f0f4ff',
          marginBottom: '0.2rem',
        }}>{name}</p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'rgba(0,245,255,0.7)',
          letterSpacing: '0.05em',
        }}>{role}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const heroTextRef = useRef(null)

  useEffect(() => {
    // Simple fade-in animation without GSAP dependency issues
    const elements = heroTextRef.current?.querySelectorAll('.animate-in')
    elements?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      setTimeout(() => {
        el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100)
    })
  }, [])

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        overflow: 'hidden',
      }}>
        {/* Radial background glow */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vmax', height: '80vmax',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, rgba(0,245,255,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Grid background */}
        <div className="grid-bg" style={{
          position: 'absolute', inset: 0,
          opacity: 0.5, pointerEvents: 'none', zIndex: 0,
        }} />

        <div ref={heroTextRef} 
          className="hero-container"
          style={{
            position: 'relative', zIndex: 2,
            textAlign: 'left',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            maxWidth: '1300px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Center Column - Text Content */}
          <div style={{ flex: 1, maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="animate-in" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'min(1rem, 3.5vw)',
              letterSpacing: '0.2em',
              color: '#00f5ff',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              opacity: 0,
            }}>
               Vasavi College of Engineering (A) &nbsp;·&nbsp; Dept. of IT
            </div>

            <h1 className="animate-in" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              opacity: 0,
            }}>
              <span style={{ display: 'block', color: '#f0f4ff' }}>ACUMEN</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #00f5ff 0%, #0077ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>IT 2026</span>
            </h1>

            <p className="animate-in" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'rgba(148,163,184,0.85)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
              lineHeight: 1.65,
              opacity: 0,
            }}>
              The annual IT symposium that pushes the boundaries of technology, creativity, and innovation. Experience the ultimate clash of intellect and innovation.
            </p>

            <div className="animate-in" style={{
              display: 'flex', gap: '1rem',
              opacity: 0,
            }}>
              <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 2.2rem', fontSize: '1rem' }}>
                Register Now ↗
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          .hero-container {
            justify-content: center !important;
          }
          @media (max-width: 991px) {
            .hero-container {
              flex-direction: column !important;
              text-align: center !important;
              padding-top: 2rem !important;
            }
            .hero-container > div {
              flex: 1 1 100% !important;
              max-width: 100% !important;
              display: flex;
              flex-direction: column;
              alignItems: center;
            }
            .hero-logo-column {
              height: 350px !important;
              margin-top: 1rem !important;
              width: 100% !important;
            }
            .hero-container p {
               margin-left: auto;
               margin-right: auto;
            }
            .hero-container .animate-in {
               justify-content: center !important;
            }
          }
        `}</style>


      </section>

      {/* ===== COUNTDOWN SECTION ===== */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 8rem)',
        textAlign: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.02) 50%, transparent)',
      }}>
        <div style={{
          background: 'rgba(8,8,32,0.8)',
          border: '1px solid rgba(0,245,255,0.12)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          maxWidth: '700px',
          margin: '0 auto',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 60px rgba(0,245,255,0.05)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.2rem',
            letterSpacing: '0.15em',
            color: 'rgba(0,245,255,0.7)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>📅 April 16, 2026</p>
          <CountdownTimer />
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            color: 'rgba(148,163,184,0.6)',
            marginTop: '1.5rem',
          }}>
            Vasavi College of Engineering — Hyderabad, Telangana
          </p>
        </div>
      </section>

      {/* ===== MENTORS SECTION ===== */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 8rem)',
        background: 'rgba(0,245,255,0.01)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Our Guides</p>
          <h2 className="section-title">
            <span className="gradient-text">Our Mentors</span>
          </h2>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {mentors.map(m => (
            <PersonCard key={m.name} {...m} />
          ))}
        </div>
      </section>

      {/* ===== COORDINATORS SECTION ===== */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 8rem)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Student Team</p>
          <h2 className="section-title">
            <span style={{ color: '#f0f4ff' }}>The </span>
            <span className="gradient-text">Coordinators</span>
          </h2>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {coordinators.map(c => (
            <PersonCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 8rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: '#f0f4ff' }}>Ready to </span>
            <span className="gradient-text">Compete?</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(148,163,184,0.75)',
            marginBottom: '2.5rem',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
          }}>
            Browse all events and register before April 16, 2026.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize: '1rem' }}>
              Register Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        padding: '2rem clamp(1.5rem, 5vw, 8rem)',
        borderTop: '1px solid rgba(0,245,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'rgba(148,163,184,0.5)',
          letterSpacing: '0.05em',
        }}>
          © 2026 ACUMEN IT · Vasavi College of Engineering (A)
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(0,245,255,0.4)',
          letterSpacing: '0.1em',
        }}>
          DEPARTMENT OF INFORMATION TECHNOLOGY
        </div>
      </footer>

    </main>
  )
}
