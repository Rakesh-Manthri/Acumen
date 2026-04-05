import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const events = [
  { id: 'webathon', title: 'Webathon', category: 'Technical', emoji: '💻', team: '2–4 members', mode: 'Offline', prize: '₹5,000', color: '#00f5ff' },
  { id: 'paper-presentation', title: 'Paper Presentation', category: 'Technical', emoji: '📄', team: '1–2 members', mode: 'Offline', prize: '₹3,000', color: '#7c3aed' },
  { id: 'project-expo', title: 'Project Expo', category: 'Technical', emoji: '🚀', team: '2–4 members', mode: 'Offline', prize: '₹4,000', color: '#a855f7' },
  { id: 'beyond-the-prompt', title: 'Beyond the Prompt', category: 'Technical', emoji: '🤖', team: '1–2 members', mode: 'Online/Offline', prize: '₹3,000', color: '#00f5ff' },
  { id: 'bgmi', title: 'BGMI Tournament', category: 'Gaming', emoji: '🎮', team: '4 members', mode: 'Offline', prize: '₹4,000', color: '#ec4899' },
  { id: 'ipl-auction', title: 'IPL Auction', category: 'Gaming', emoji: '🏏', team: '2–3 members', mode: 'Offline', prize: '₹2,000', color: '#f59e0b' },
  { id: 'console-convergence', title: 'Console Convergence', category: 'Gaming', emoji: '🕹️', team: '1–2 members', mode: 'Offline', prize: '₹2,500', color: '#7c3aed' },
  { id: 'geo-guesser', title: 'Geo Guesser', category: 'Gaming', emoji: '🌍', team: '1 member', mode: 'Online', prize: '₹1,500', color: '#10b981' },
  { id: 'tech-tac-toe', title: 'Tech Tac Toe', category: 'Gaming', emoji: '⭕', team: '1 member', mode: 'Offline', prize: '₹1,500', color: '#00f5ff' },
  { id: 'tug-wars', title: 'Tug Wars', category: 'Gaming', emoji: '💪', team: '6 members', mode: 'Offline', prize: '₹2,000', color: '#ef4444' },
  { id: 'scary-house', title: 'Scary House', category: 'Creative', emoji: '👻', team: 'Individual', mode: 'Offline', prize: 'Experience', color: '#7c3aed' },
  { id: 'face-painting', title: 'Face Painting', category: 'Creative', emoji: '🎨', team: '1–2 members', mode: 'Offline', prize: '₹1,500', color: '#ec4899' },
  { id: 'digital-art', title: 'Digital Art', category: 'Creative', emoji: '🖌️', team: '1 member', mode: 'Offline', prize: '₹2,000', color: '#a855f7' },
  { id: 'vr-zone', title: 'VR Zone', category: 'Experience', emoji: '🥽', team: 'Individual', mode: 'Offline', prize: 'Experience', color: '#00f5ff' },
]

const DEPTS = [
  'B.Tech - IT', 'B.Tech - CSE', 'B.Tech - ECE', 'B.Tech - EEE',
  'B.Tech - Civil', 'B.Tech - Mechanical', 'B.Tech - Chemical',
  'M.Tech - IT', 'M.Tech - CSE', 'MCA', 'Other',
]

const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'N/A']

function FloatingField({ id, label, error, children, required }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: error ? '#f87171' : 'rgba(0,245,255,0.65)',
      }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#f87171',
          marginTop: '0.1rem',
          letterSpacing: '0.05em',
        }}>
          ⚠ {error.message}
        </span>
      )}
    </div>
  )
}

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(5,5,16,0.8)',
  border: `1px solid ${hasError ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'}`,
  borderRadius: '10px',
  color: '#f0f4ff',
  fontFamily: 'var(--font-display)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
})

const selectStyle = (hasError) => ({
  ...inputStyle(hasError),
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300f5ff' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  paddingRight: '2.5rem',
  cursor: 'pointer',
})

function InputField({ id, style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      id={id}
      {...props}
      style={{ ...inputStyle(false), ...(extraStyle || {}), borderColor: focused ? 'rgba(0,245,255,0.5)' : inputStyle(false).borderColor, boxShadow: focused ? '0 0 15px rgba(0,245,255,0.1)' : 'none' }}
      onFocus={e => { setFocused(true); props.onFocus?.(e) }}
      onBlur={e => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

export default function Register() {
  const [searchParams] = useSearchParams()
  const preselectedEvent = searchParams.get('event') || ''

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm({
    defaultValues: {
      event: preselectedEvent,
      name: '',
      email: '',
      phone: '',
      rollNo: '',
      dept: '',
      section: '',
      paymentScreenshot: null,
    }
  })

  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState('')
  const formRef = useRef(null)

  const selectedEventId = watch('event')
  const selectedEvent = events.find(e => e.id === selectedEventId)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500))
    console.log('Registration data:', data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '480px',
          width: '100%',
        }}>
          {/* Success icon */}
          <div style={{
            width: 90, height: 90,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.2))',
            border: '2px solid rgba(0,245,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 2rem',
            boxShadow: '0 0 40px rgba(0,245,255,0.2)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}>
            ✓
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            marginBottom: '1rem',
          }}>
            <span className="gradient-text">Registration Successful!</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'rgba(148,163,184,0.8)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}>
            You've successfully registered for <strong style={{ color: '#00f5ff' }}>Acumen IT 2026</strong>. Check your email for confirmation details.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-outline"
            >
              Register for Another
            </button>
            <Link to="/" className="btn-primary">Back to Home →</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px' }}>

      {/* Page Header */}
      <section style={{
        padding: 'clamp(3rem, 5vw, 4rem) clamp(1.5rem, 5vw, 8rem) 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top center, rgba(124,58,237,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="grid-bg" style={{
          position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Acumen IT 2026</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 7vw, 4rem)',
            marginBottom: '0.75rem',
          }}>
            <span style={{ color: '#f0f4ff' }}>Event </span>
            <span className="gradient-text">Registration</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'rgba(148,163,184,0.7)',
          }}>
            Fill the form below · April 16, 2026
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{
        padding: '1rem clamp(1.5rem, 5vw, 8rem) clamp(4rem, 6vw, 6rem)',
      }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
        }}>

          {/* Selected event preview */}
          {selectedEvent && (
            <div style={{
              background: `rgba(${hexToRgb(selectedEvent.color)}, 0.06)`,
              border: `1px solid rgba(${hexToRgb(selectedEvent.color)}, 0.25)`,
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
            }}>
              <span style={{ fontSize: '1.6rem' }}>{selectedEvent.emoji}</span>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: selectedEvent.color,
                }}>{selectedEvent.title}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'rgba(148,163,184,0.6)',
                  letterSpacing: '0.05em',
                }}>
                  {selectedEvent.team} · {selectedEvent.mode}
                  {selectedEvent.prize !== 'Experience' && ` · Prize: ${selectedEvent.prize}`}
                </div>
              </div>
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{
              background: 'rgba(8, 8, 32, 0.75)',
              border: '1px solid rgba(0,245,255,0.12)',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 60px rgba(0,0,0,0.4), 0 0 120px rgba(124,58,237,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Top border gradient */}
            <div style={{
              position: 'relative',
              marginBottom: '-0.5rem',
            }}>
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, #00f5ff, #7c3aed, #ec4899)',
                borderRadius: '2px',
                marginBottom: '1.5rem',
              }} />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(0,245,255,0.5)',
                textTransform: 'uppercase',
              }}>
                &gt; registration.form
              </div>
            </div>

            {/* Event Selection */}
            <FloatingField id="field-event" label="Select Event" error={errors.event} required>
              <div style={{ position: 'relative' }}>
                <select
                  id="field-event"
                  {...register('event', { required: 'Please select an event' })}
                  style={{
                    ...selectStyle(!!errors.event),
                    borderColor: errors.event ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.event ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                >
                  <option value="" style={{ background: '#0d0d2b' }}>-- Select an event --</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id} style={{ background: '#0d0d2b' }}>
                      {ev.emoji} {ev.title} ({ev.category})
                    </option>
                  ))}
                </select>
              </div>
            </FloatingField>

            {/* Two columns: Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <FloatingField id="field-name" label="Full Name" error={errors.name} required>
                <input
                  id="field-name"
                  type="text"
                  placeholder="Eg. Ravi Kumar"
                  autoComplete="name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name too short' },
                    pattern: { value: /^[a-zA-Z\s.]+$/, message: 'Letters and spaces only' },
                  })}
                  style={inputStyle(!!errors.name)}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </FloatingField>

              <FloatingField id="field-email" label="Email Address" error={errors.email} required>
                <input
                  id="field-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
                  })}
                  style={inputStyle(!!errors.email)}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </FloatingField>
            </div>

            {/* Phone & Roll No */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <FloatingField id="field-phone" label="Phone Number" error={errors.phone} required>
                <input
                  id="field-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  maxLength={10}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile no.' },
                  })}
                  style={inputStyle(!!errors.phone)}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.phone ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </FloatingField>

              <FloatingField id="field-roll" label="Roll Number" error={errors.rollNo} required>
                <input
                  id="field-roll"
                  type="text"
                  placeholder="Eg. 22NH1A0512"
                  {...register('rollNo', {
                    required: 'Roll number is required',
                    minLength: { value: 3, message: 'Enter a valid roll number' },
                  })}
                  style={inputStyle(!!errors.rollNo)}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.rollNo ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                />
              </FloatingField>
            </div>

            {/* Dept & Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <FloatingField id="field-dept" label="Department" error={errors.dept} required>
                <select
                  id="field-dept"
                  {...register('dept', { required: 'Please select your department' })}
                  style={{
                    ...selectStyle(!!errors.dept),
                    borderColor: errors.dept ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.dept ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                >
                  <option value="" style={{ background: '#0d0d2b' }}>-- Select Department --</option>
                  {DEPTS.map(d => (
                    <option key={d} value={d} style={{ background: '#0d0d2b' }}>{d}</option>
                  ))}
                </select>
              </FloatingField>

              <FloatingField id="field-section" label="Section" error={errors.section} required>
                <select
                  id="field-section"
                  {...register('section', { required: 'Please select your section' })}
                  style={{
                    ...selectStyle(!!errors.section),
                    borderColor: errors.section ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = errors.section ? 'rgba(248,113,113,0.5)' : 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none' }}
                >
                  <option value="" style={{ background: '#0d0d2b' }}>-- Section --</option>
                  {SECTIONS.map(s => (
                    <option key={s} value={s} style={{ background: '#0d0d2b' }}>{s}</option>
                  ))}
                </select>
              </FloatingField>
            </div>

            {/* Payment Screenshot Upload */}
            <FloatingField id="field-payment" label="Payment Screenshot" error={errors.paymentScreenshot} required>
              <div
                style={{
                  border: `2px dashed ${errors.paymentScreenshot ? 'rgba(248,113,113,0.4)' : 'rgba(0,245,255,0.2)'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(0,245,255,0.02)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'
                  e.currentTarget.style.background = 'rgba(0,245,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = errors.paymentScreenshot ? 'rgba(248,113,113,0.4)' : 'rgba(0,245,255,0.2)'
                  e.currentTarget.style.background = 'rgba(0,245,255,0.02)'
                }}
              >
                <input
                  id="field-payment"
                  type="file"
                  accept="image/*,.pdf"
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: 0, cursor: 'pointer', width: '100%', height: '100%',
                  }}
                  {...register('paymentScreenshot', {
                    required: 'Payment screenshot is required',
                    validate: {
                      size: (files) => {
                        if (!files || !files[0]) return 'Please upload a file'
                        return files[0].size <= 5 * 1024 * 1024 || 'File must be under 5MB'
                      },
                    },
                  })}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    setFileName(file ? file.name : '')
                  }}
                />
                <div style={{ pointerEvents: 'none' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {fileName ? '✅' : '📎'}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: fileName ? '#00f5ff' : 'rgba(148,163,184,0.6)',
                    marginBottom: '0.25rem',
                  }}>
                    {fileName || 'Click or drag & drop your payment screenshot'}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(148,163,184,0.4)',
                    letterSpacing: '0.05em',
                  }}>
                    JPG, PNG, PDF · Max 5MB
                  </p>
                </div>
              </div>
            </FloatingField>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: '1rem',
                padding: '1rem 2rem',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Submitting…
                </>
              ) : (
                <>Register for Acumen IT 2026 →</>
              )}
            </button>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(148,163,184,0.4)',
              textAlign: 'center',
              letterSpacing: '0.05em',
              lineHeight: 1.65,
            }}>
              By submitting you agree to the event rules and participation guidelines.
              Your data will only be used for event communication.
            </p>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'rgba(0,245,255,0.5)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
            }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
        }}>
          © 2026 ACUMEN IT · Vasavi College of Engineering (A)
        </div>
        <Link to="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(0,245,255,0.4)',
          textDecoration: 'none',
          letterSpacing: '0.1em',
        }}>← BACK TO HOME</Link>
      </footer>
    </main>
  )
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 245, 255'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}
