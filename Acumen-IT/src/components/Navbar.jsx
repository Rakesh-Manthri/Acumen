import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '2.5rem',
      left: 0,
      width: '100%',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }}>
      <NavLink 
        to="/" 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '100px',
          padding: '0.8rem 2.5rem',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-display)',
          pointerEvents: 'auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        ACUMEN-IT
      </NavLink>
    </div>
  )
}
