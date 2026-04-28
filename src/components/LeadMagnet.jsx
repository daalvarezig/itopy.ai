import { useState } from 'react'
import { supabase } from '../utils/supabase'
import { getStoredUTMs } from '../utils/marketing'

const PDF_URL = '/lead-magnet.pdf'

export default function LeadMagnet() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSending(true)
    const utms = getStoredUTMs()
    try {
      await supabase.from('leads').insert({
        email: email.trim(),
        desafio: 'Lead magnet — 10 automatizaciones',
        utm_source: utms.utm_source || 'lead-magnet',
        utm_medium: utms.utm_medium || 'pdf',
        utm_campaign: utms.utm_campaign || null,
        utm_content: utms.utm_content || null,
        utm_term: utms.utm_term || null,
      })
    } catch (err) {
      console.error(err)
    }
    setSending(false)
    setDone(true)
    // Forzar descarga
    const a = document.createElement('a')
    a.href = PDF_URL
    a.download = 'itopy-10-automatizaciones.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const reset = () => { setOpen(false); setDone(false); setEmail('') }

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1))',
        border: '1.5px solid rgba(99,102,241,0.4)',
        borderRadius: 28,
        padding: '48px 32px',
        margin: '60px auto',
        maxWidth: 920,
        textAlign: 'center',
      }}>
        <p style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
          📥 Guía gratuita
        </p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
          10 automatizaciones que tu negocio<br />puede tener mañana
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.5 }}>
          Ideas reales, listas para implementar. Sin tecnicismos. Solo lo que funciona en negocios pequeños y medianos.
        </p>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            color: '#fff', border: 'none', padding: '14px 36px',
            borderRadius: 999, fontSize: '0.95rem', fontWeight: 700,
            cursor: 'pointer', transition: '0.2s',
            boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          Descargar PDF gratis →
        </button>
      </section>

      {open && (
        <div onClick={reset} style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(15,15,30,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(15,15,30,0.95))',
            border: '1.5px solid rgba(99,102,241,0.4)',
            borderRadius: 24, padding: 36, maxWidth: 460, width: '100%',
            color: '#fff', position: 'relative',
          }}>
            <button onClick={reset} style={{
              position: 'absolute', top: 12, right: 12, background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.4)', fontSize: 24, cursor: 'pointer', padding: 8,
            }}>×</button>

            {!done ? (
              <form onSubmit={submit}>
                <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                  📥 Casi listo
                </p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>
                  Te lo mando ahora
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5 }}>
                  Déjame tu email y descargas el PDF al instante. Sin spam — palabra.
                </p>
                <input
                  type="email" required autoFocus
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)',
                    color: '#fff', fontSize: '0.95rem', outline: 'none', marginBottom: 16,
                  }}
                />
                <button type="submit" disabled={sending} style={{
                  width: '100%', padding: '14px',
                  background: sending ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #a78bfa)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  fontSize: '0.95rem', fontWeight: 700, cursor: sending ? 'wait' : 'pointer',
                }}>
                  {sending ? 'Preparando…' : 'Descargar ahora'}
                </button>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 12, textAlign: 'center' }}>
                  Al descargar aceptas nuestra <a href="/privacidad" style={{ color: '#a78bfa' }}>política de privacidad</a>.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>✓</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>¡Descargado!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: 20 }}>
                  Si no se descargó automáticamente, <a href={PDF_URL} download style={{ color: '#a78bfa', fontWeight: 700 }}>haz click aquí</a>.
                </p>
                <button onClick={reset} style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)', padding: '10px 24px',
                  borderRadius: 999, cursor: 'pointer', fontSize: '0.9rem',
                }}>Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
