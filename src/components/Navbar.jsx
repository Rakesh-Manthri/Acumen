import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* TOP HEADER BADGE */}
      <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          width: 'calc(100% - 2rem)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'auto',
          backgroundColor: 'rgba(0, 245, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 245, 255, 0.08)',
          borderRadius: '30px',
          padding: '1.5rem',
          color: '#00f5ff',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(0,245,255,0.05)'
      }}>
        Acumen IT
      </div>

      {/* BOTTOM FLOATING MENU */}
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
      {/* Interactive Wrapper holding all three pills */}
      <div 
        className="nav-group-wrapper"
        style={{ display: 'flex', alignItems: 'flex-end', pointerEvents: 'auto' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* AIT Oval Outside Menu */}
        <div 
          className="ait-pill" 
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transform: isOpen ? 'translateX(0) scale(1)' : 'translateX(10px) scale(0.9)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '40px',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          AIT
        </div>

        {/* The Expandable Menu Pill */}
        <div 
          className={`menu-pill ${isOpen ? 'open' : ''}`}
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isOpen ? 'default' : 'pointer',
            overflow: 'hidden',
            position: 'relative'
          }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* Menu Default State */}
          <div style={{
            position: 'absolute',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
            transform: isOpen ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase'
          }}>
            Menu
          </div>

          {/* Expanded Links State */}
          <div className="links-container" style={{ 
            position: 'absolute',
            display: 'flex',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transform: isOpen ? 'scale(1)' : 'scale(1.05)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            <NavLink to="/" end onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/events" onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Events</NavLink>
            <NavLink to="/register" onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Register</NavLink>
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
              className="nav-link"
            >
              Close
            </a>
          </div>
        </div>

        {/* Theme Oval Outside Menu */}
        <div 
          className="theme-pill"
          onClick={() => {
             document.body.classList.toggle('light-theme');
          }}
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transform: isOpen ? 'translateX(0) scale(1)' : 'translateX(-10px) scale(0.9)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '40px',
            color: 'var(--text-primary)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        }}>
          {/* Theme Logo Visual */}
          <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', pointerEvents: 'none' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      <style>{`
        .ait-pill, .theme-pill {
          padding: 0 1.4rem;
          height: 54px;
        }
        
        .ait-pill {
          margin-right: 0.8rem;
        }

        .theme-pill {
          margin-left: 0.8rem;
        }

        .menu-pill {
          width: 130px;
          height: 54px;
          border-radius: 100px;
        }

        .menu-pill.open {
          width: 410px;
          height: 54px;
        }

        .links-container {
          flex-direction: row;
          gap: 0.2rem;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 40px;
          transition: all 0.4s ease;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(0,0,0,0.05);
        }
        .nav-link.active {
          color: #fff;
          background: var(--accent-violet);
        }

        @media (max-width: 640px) {
          .menu-pill.open {
            width: 160px;
            height: 240px;
            border-radius: 28px;
          }
          .links-container {
            flex-direction: column;
            gap: 0.5rem;
          }
          .nav-link {
            width: 80%;
            text-align: center;
            padding: 0.6rem;
          }
          .ait-pill {
            margin-right: 0.4rem;
            padding: 0 1rem;
          }
          .theme-pill {
            margin-left: 0.4rem;
            padding: 0 1rem;
          }
        }
      `}</style>
      </div>
    </>
  )
}
