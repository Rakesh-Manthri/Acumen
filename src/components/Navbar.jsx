import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  // Hook to get current URL path
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isOpen, setIsOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [isVisible, setIsVisible] = useState(!isHomePage);

  // On home page: the pill background appears as you scroll
  const badgeVisible = (!isHomePage || showBadge) && isVisible;

  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => setIsVisible(true), 4500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // We reveal the pill early (100px) so the particles have a "dock" to fly into
      setShowBadge(window.scrollY > 100);
    }

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll(); 
    } else {
      setShowBadge(true)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

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
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '30px',
          padding: '1.2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          opacity: badgeVisible ? 1 : 0,
          transform: badgeVisible ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: badgeVisible ? 'auto' : 'none',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <span style={{
          color: '#000',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: isHomePage ? 0 : 1, 
          transition: 'opacity 0.3s ease'
        }}>
          Acumen IT
        </span>
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
        <div 
          className="nav-group-wrapper"
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            pointerEvents: badgeVisible ? 'auto' : 'none',
            opacity: badgeVisible ? 1 : 0,
            transition: 'opacity 0.8s ease'
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >

          {/* The Expandable Menu Pill */}
          <div 
            className={`menu-pill ${isOpen ? 'open' : ''}`}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#000',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isOpen ? 'default' : 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={() => !isOpen && setIsOpen(true)}
          >
            <div style={{
              position: 'absolute',
              opacity: isOpen ? 0 : 1,
              pointerEvents: isOpen ? 'none' : 'auto',
              transform: isOpen ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase'
            }}>
              Menu
            </div>

            <div className="links-container" style={{ 
              position: 'absolute',
              display: 'flex',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
              transform: isOpen ? 'scale(1)' : 'scale(1.05)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
              <NavLink to="/" end onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              <NavLink to="/events" onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Events</NavLink>
              <NavLink to="/register" onClick={() => setIsOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Register</NavLink>
              <span 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="nav-link"
                style={{ cursor: 'pointer', color: '#999' }}
              >
                ×
              </span>
            </div>
          </div>
        </div>

        <style>{`
          .ait-pill { padding: 0 1.4rem; height: 50px; margin-right: 0.6rem; }

          .menu-pill { width: 110px; height: 50px; border-radius: 100px; }
          .menu-pill.open { width: 380px; height: 50px; }

          .links-container { gap: 0.5rem; }

          .nav-link {
            color: #666;
            text-decoration: none;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 0.85rem;
            padding: 0.5rem 1.2rem;
            border-radius: 40px;
            transition: all 0.3s ease;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .nav-link:hover { color: #000; background: rgba(0,0,0,0.04); }
          .nav-link.active { color: #fff; background: #000; }

          @media (max-width: 640px) {
            .menu-pill.open { width: 180px; height: 260px; border-radius: 30px; }
            .links-container { flex-direction: column; gap: 0.8rem; }
            .nav-link { width: 85%; text-align: center; }
          }
        `}</style>
      </div>
    </>
  )
}