import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const EVENTS_LIST = [
  { id: 'event-1', title: 'PAPER AND POSTER', price: '₹100' },
  { id: 'event-2', title: 'WEBATHON (PER TEAM)', price: '₹150' },
  { id: 'event-3', title: 'PROJECT EXPO (PER TEAM)', price: '₹100' },
  { id: 'event-4', title: 'PHOTOGRAPHY CHALLENGE', price: '₹50' },
  { id: 'event-7', title: 'DIGITAL PING PONG', price: '₹50' },
  { id: 'event-8', title: 'SCARY HOUSE', price: '₹50' },
  { id: 'event-9', title: 'MINI GOLF', price: '₹50' },
  { id: 'event-10', title: 'EXTRACTION', price: '₹50' },
  { id: 'event-11', title: 'BINARY BOUNTY HUNT', price: '₹50' },
  { id: 'event-14', title: 'NERF TAG', price: '₹225' },
  { id: 'event-15', title: 'AGENTS TALE (TEAM 2)', price: '₹100' },
  { id: 'event-16', title: 'VR ZONE', price: '₹50' },
  { id: 'event-17', title: 'WHISPER CHALLENGE', price: '₹30' },
  { id: 'event-18', title: 'GEO GUESSR', price: '₹50' },
  { id: 'event-19', title: 'PIXEL ART', price: '₹30' },
]

function FormField({ id, label, error, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: error ? '#e11d48' : '#666'
      }}>
        {label} {required && '*'}
      </label>
      {children}
      {error && <span style={{ fontSize: '0.7rem', color: '#e11d48' }}>{error.message}</span>}
    </div>
  )
}

const inputStyle = (error) => ({
  width: '100%',
  padding: '0.8rem 1rem',
  background: '#fff',
  border: `1px solid ${error ? '#e11d48' : '#ddd'}`,
  borderRadius: '10px',
  fontFamily: 'var(--font-display)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'all 0.2s ease'
})

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 2000))
    console.log("Registration Data:", data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1EFE9' }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: '4rem', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</h1>
          <h2 style={{ fontWeight: 800, fontSize: '2rem' }}>Registration Sent</h2>
          <p style={{ color: '#888', marginTop: '1rem' }}>We will contact you shortly for payment verification.</p>
          <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', background: '#000', color: '#fff', padding: '1rem 2rem', borderRadius: '50px', textDecoration: 'none' }}>Return Home</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F1EFE9', paddingTop: '120px', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em' }}>Event Registration</h1>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#888', letterSpacing: '0.2em' }}>ACUMEN IT SYMPOSIUM 2026</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} style={{ 
          background: '#fff', 
          padding: 'clamp(2rem, 5vw, 3.5rem)', 
          borderRadius: '32px', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}>
          
          {/* PERSONAL INFO GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <FormField id="name" label="Full Name" error={errors.name} required>
              <input {...register('name', { required: 'Required' })} placeholder="Enter your name" style={inputStyle(errors.name)} />
            </FormField>

            <FormField id="email" label="Email Address" error={errors.email} required>
              <input {...register('email', { required: 'Required' })} type="email" placeholder="Email" style={inputStyle(errors.email)} />
            </FormField>

            <FormField id="branch" label="Branch" error={errors.branch} required>
              <input {...register('branch', { required: 'Required' })} placeholder="Eg. IT, CSE" style={inputStyle(errors.branch)} />
            </FormField>

            <FormField id="section" label="Section" error={errors.section} required>
              <input {...register('section', { required: 'Required' })} placeholder="Eg. A, B" style={inputStyle(errors.section)} />
            </FormField>

            <FormField id="year" label="Year" error={errors.year} required>
              <select {...register('year', { required: 'Required' })} style={inputStyle(errors.year)}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </FormField>

            <FormField id="rollNo" label="Roll Number" error={errors.rollNo} required>
              <input {...register('rollNo', { required: 'Required' })} placeholder="Eg. 22NH1A..." style={inputStyle(errors.rollNo)} />
            </FormField>

            <FormField id="college" label="College Name" error={errors.college} required>
              <input {...register('college', { required: 'Required' })} placeholder="Your College" style={inputStyle(errors.college)} />
            </FormField>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />

          {/* EVENTS SELECTION SECTION */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Select Events</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1rem',
              maxHeight: '400px',
              overflowY: 'auto',
              paddingRight: '1rem'
            }}>
              {EVENTS_LIST.map((event) => (
                <label key={event.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  background: '#fcfcfc',
                  border: '1px solid #eee',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} className="event-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input type="checkbox" {...register('selectedEvents')} value={event.title} style={{ width: '20px', height: '20px', accentColor: '#000' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{event.title}</span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>{event.price}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} style={{
            background: '#000',
            color: '#fff',
            padding: '1.25rem',
            borderRadius: '100px',
            fontSize: '1.1rem',
            fontWeight: 800,
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {isSubmitting ? 'Processing...' : 'Complete Registration →'}
          </button>
        </form>
      </div>

      <style>{`
        .event-item:hover {
          border-color: #000;
          background: #fff;
          transform: translateY(-2px);
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
      `}</style>
    </main>
  )
}