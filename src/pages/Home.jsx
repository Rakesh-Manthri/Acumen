import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import Navbar from '../components/Navbar'
import LogoScene from '../components/LogoScene'
import Lanyard from '../components/Lanyard'

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

function PersonCard({ name, role, initial }) {
  return (
    <div style={{
      background: '#ffffff',
      border: `1px solid rgba(0,0,0,0.06)`,
      borderRadius: '20px',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      width: '220px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
      }}
    >
      <div style={{
        width: 70, height: 70,
        borderRadius: '50%',
        background: '#1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700,
        fontSize: '1.5rem',
        color: '#F1EFE9',
      }}>
        {initial}
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#000', marginBottom: '0.25rem' }}>{name}</p>
        <p style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{role}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const contentRef = useRef(null)

  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll('.animate-in')
    elements?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      setTimeout(() => {
        el.style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s`
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        // 4500ms delay ensures particles form completely before text appears
      }, 4500) 
    })
  }, [])

  return (
    <main ref={contentRef} style={{ background: '#F1EFE9', color: '#1a1a1a', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      
      {/* 1. ANIMATION LAYER (Fixed in background) */}
      <LogoScene />

      {/* 2. HERO SPACER 
          This creates the empty 100vh room where the big particle text 
          forms. It is transparent to let the LogoScene show through.
      */}
      <section style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'transparent',
        pointerEvents: 'none'
      }} />

      {/* 3. HERO CONTENT SECTION 
          This section appears after the particles are formed.
      */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="animate-in" style={{ letterSpacing: '0.4em', color: '#888', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          VASAVI COLLEGE OF ENGINEERING (A)
        </div>
        <h1 className="animate-in" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
          Unleash the Future of <br/> Information Technology
        </h1>
        <p className="animate-in" style={{ maxWidth: '650px', margin: '0 auto 3rem', color: '#555', fontSize: '1.2rem', lineHeight: 1.6 }}>
          Experience a day of intense competition, technical workshops, and innovative displays at the premier annual IT symposium.
        </p>
      </section>

      {/* 4. COUNTDOWN SECTION */}
      <section style={{ padding: '4rem 1.5rem', position: 'relative', zIndex: 2 }}>
        <div className="animate-in" style={{
          background: '#ffffff',
          borderRadius: '40px',
          padding: '4rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: '0 40px 100px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: '#999', marginBottom: '2rem' }}>SYMPOSIUM COUNTDOWN</h3>
          <CountdownTimer />
          <p style={{ marginTop: '2.5rem', fontWeight: 600, color: '#333' }}>April 16, 2026 — Hyderabad, India</p>
        </div>
      </section>

      {/* 5. THE TEAM SECTION */}
      <section style={{ padding: '8rem 1.5rem', position: 'relative', zIndex: 2 }}>
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>The Team</h2>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>The minds driving Acumen IT 2026</p>
        </div>

        {/* SUB-SECTION: MENTORS */}
        <div className="animate-in" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem', justifyContent: 'center' }}>
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', flex: 1, maxWidth: '100px' }} />
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>
              Faculty Mentors
            </h3>
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', flex: 1, maxWidth: '100px' }} />
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1300px', margin: '0 auto' }}>
            {mentors.map((m, i) => <PersonCard key={i} {...m} />)}
          </div>
        </div>

        {/* SUB-SECTION: COORDINATORS */}
        <div className="animate-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem', justifyContent: 'center' }}>
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', flex: 1, maxWidth: '100px' }} />
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>
              Student Coordinators
            </h3>
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', flex: 1, maxWidth: '100px' }} />
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1300px', margin: '0 auto' }}>
            {coordinators.map((c, i) => <PersonCard key={i} {...c} />)}
          </div>
        </div>
      </section>

      {/* 6. CONTACT INTERACTION SECTION */}
      <section style={{ padding: '4rem 1.5rem', position: 'relative', zIndex: 2 }}>
        <div className="animate-in" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#ffffff',
          borderRadius: '40px',
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.04)',
        }}>
          {/* LEFT: 3D INTERACTION */}
          <div style={{ width: '100%', maxWidth: '600px', height: '60vh', position: 'relative' }}>
            <Lanyard />
            <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#999', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
              CLICK AND DRAG TO INTERACT
            </div>
          </div>

          {/* RIGHT: CONTACT TEXT */}
          <div style={{ maxWidth: '450px', padding: '2rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Get in touch.</h2>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Have questions about Acumen IT 2026? Reach out to our team or visit us at the IT Department, Vasavi College of Engineering.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', color: '#999', marginBottom: '0.5rem' }}>General Inquiries</p>
                <a href="mailto:acumenit@vce.ac.in" style={{ fontSize: '1.1rem', color: '#000', textDecoration: 'none', fontWeight: 700 }}>acumenit@vce.ac.in</a>
              </div>
              <div>
                <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', color: '#999', marginBottom: '0.5rem' }}>Student Leads</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{
        padding: '5rem 1.5rem 3rem',
        background: '#F1EFE9', 
        borderTop: '1px solid rgba(0,0,0,0.1)',
        marginTop: '4rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem'
        }}>
          {/* Top Row: Branding and Main Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 800, 
                fontSize: '1.8rem', 
                letterSpacing: '-0.02em',
                marginBottom: '1rem'
              }}>
                ACUMEN IT <span style={{ fontWeight: 400, color: '#888' }}>2026</span>
              </div>
              <p style={{ 
                color: '#666', 
                fontSize: '0.9rem', 
                lineHeight: 1.6,
                fontFamily: 'var(--font-display)'
              }}>
                Pushing the boundaries of innovation at the intersection of technology and creativity.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Navigation</p>
                <Link to="/" style={{ textDecoration: 'none', color: '#000', fontWeight: 600, fontSize: '0.9rem' }}>Home</Link>
                <Link to="/events" style={{ textDecoration: 'none', color: '#000', fontWeight: 600, fontSize: '0.9rem' }}>Events</Link>
                <Link to="/register" style={{ textDecoration: 'none', color: '#000', fontWeight: 600, fontSize: '0.9rem' }}>Register</Link>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Venue</p>
                <p style={{ color: '#000', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>Vasavi College of Engineering</p>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Ibrahimbagh, Hyderabad</p>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Telangana, 500031</p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Institutional Info and Copyright */}
          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.06)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '1px', background: '#ccc' }} />
              <p style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                color: '#888', 
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                Dept. of Information Technology
              </p>
            </div>

            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.7rem', 
              color: '#bbb', 
              letterSpacing: '0.05em',
              margin: 0
            }}>
              © 2026 ACUMEN IT · ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}