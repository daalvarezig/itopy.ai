import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const authStyles = `
  .auth-bg {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    position: relative;
    background:
      radial-gradient(circle at 20% 15%, rgba(92,115,242,0.22), transparent 18%),
      radial-gradient(circle at 78% 22%, rgba(0,229,255,0.12), transparent 14%),
      radial-gradient(circle at 65% 80%, rgba(124,58,237,0.12), transparent 18%),
      linear-gradient(135deg, #050816, #0b1023 55%, #0b0f1f);
  }
  .auth-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 42px 42px;
    opacity: 0.35;
    pointer-events: none;
  }
  .auth-card-new {
    width: 100%;
    max-width: 470px;
    position: relative;
    padding: 42px 38px 30px;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(33,38,58,0.88), rgba(18,22,37,0.92));
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 0 30px rgba(56,189,248,0.18);
    backdrop-filter: blur(14px);
    overflow: hidden;
    z-index: 1;
  }
  .auth-card-new::before {
    content: "";
    position: absolute;
    width: 220px;
    height: 220px;
    left: -88px;
    top: -74px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(92,115,242,0.96) 0%, rgba(92,115,242,0.74) 45%, rgba(92,115,242,0.08) 72%, transparent 74%);
    filter: blur(2px);
    pointer-events: none;
  }
  .auth-card-new::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
    pointer-events: none;
  }
  .brand-icon-new {
    width: 68px; height: 68px;
    margin: 0 auto 14px;
    border-radius: 20px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(92,115,242,0.24), rgba(0,229,255,0.18));
    border: 1px solid rgba(125,211,252,0.18);
    box-shadow: 0 0 24px rgba(56,189,248,0.18);
    position: relative;
    z-index: 2;
  }
  .auth-eyebrow {
    text-align: center;
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #9fb2cc;
    position: relative;
    z-index: 2;
    margin-bottom: 6px;
  }
  .auth-title {
    margin: 0 0 8px;
    text-align: center;
    font-size: 2.35rem;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 2;
    background: linear-gradient(90deg, #ffffff, #38bdf8, #00e5ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .auth-subtitle {
    margin: 0 0 28px;
    text-align: center;
    color: #9fb2cc;
    font-size: 0.95rem;
    position: relative;
    z-index: 2;
  }
  .auth-field { position: relative; margin-bottom: 16px; }
  .auth-input {
    width: 100%;
    height: 60px;
    padding: 0 18px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.08);
    color: #eaf4ff;
    font-size: 1rem;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    box-sizing: border-box;
  }
  .auth-input::placeholder { color: #c8d3e3; opacity: 0.62; }
  .auth-input:focus {
    border-color: rgba(56,189,248,0.5);
    box-shadow: 0 0 0 4px rgba(56,189,248,0.10), 0 0 24px rgba(56,189,248,0.08);
    background: rgba(255,255,255,0.10);
  }
  .auth-toggle {
    position: absolute; right: 16px; top: 50%;
    transform: translateY(-50%);
    border: 0; background: transparent;
    color: #cfd8e6; cursor: pointer;
    padding: 6px; opacity: 0.78; font-size: 1rem; z-index: 3;
  }
  .auth-toggle:hover { opacity: 1; }
  .auth-forgot { display: flex; justify-content: flex-end; margin-bottom: 8px; }
  .auth-link {
    color: #38bdf8; text-decoration: none;
    font-size: 0.92rem; font-weight: 600;
    background: none; border: none; cursor: pointer;
  }
  .auth-link:hover { color: #00e5ff; }
  .auth-btn {
    width: 100%; height: 60px; border: none;
    border-radius: 18px; color: white;
    font-size: 1.05rem; font-weight: 800;
    letter-spacing: 0.06em; cursor: pointer;
    background: linear-gradient(90deg, #7c3aed, #5C73F2, #38bdf8);
    box-shadow: 0 0 16px rgba(92,115,242,0.28), 0 0 34px rgba(56,189,248,0.14);
    transition: transform .2s, box-shadow .2s, filter .2s;
    margin-top: 8px;
  }
  .auth-btn:hover:not(:disabled) {
    transform: translateY(-1px); filter: brightness(1.05);
    box-shadow: 0 0 22px rgba(92,115,242,0.34), 0 0 42px rgba(56,189,248,0.18);
  }
  .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .auth-footer-new {
    margin-top: 22px; text-align: center;
    color: #9fb2cc; font-size: 0.96rem;
    position: relative; z-index: 2;
  }
  .corner-glow-new {
    position: absolute; right: -40px; bottom: -40px;
    width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.18), transparent 65%);
    pointer-events: none; z-index: 1;
  }
`

export default function AuthPage({ mode }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="auth-bg">
      <style>{authStyles}</style>
      <div className="auth-card-new">
        <div className="brand-icon-new">
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <defs>
              <linearGradient id="iconGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="55%" stopColor="#5C73F2" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>
            </defs>
            <path fill="url(#iconGrad)" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Zm7-6h-2V6h-2v2h-2v2h2v2h2v-2h2Z"/>
          </svg>
        </div>

        <div className="auth-eyebrow">AI Receptionist SaaS</div>
        <h1 className="auth-title">{isLogin ? 'Sign In' : 'Create Account'}</h1>
        <p className="auth-subtitle">
          {isLogin
            ? 'Accede al panel de conversaciones, clientes y configuración.'
            : 'Únete y automatiza tu recepción con IA hoy mismo.'}
        </p>

        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 2 }}>
          {!isLogin && (
            <div className="auth-field">
              <input className="auth-input" type="text" placeholder="Full Name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
          )}
          <div className="auth-field">
            <input className="auth-input" type="email" placeholder="Email Address"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="auth-field">
            <input className="auth-input" type={showPass ? 'text' : 'password'} placeholder="Password"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ paddingRight: '48px' }} required />
            <button type="button" className="auth-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? '🙈' : '👁'}
            </button>
          </div>
          {!isLogin && (
            <div className="auth-field">
              <input className="auth-input" type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password"
                value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                style={{ paddingRight: '48px' }} required />
              <button type="button" className="auth-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? '🙈' : '👁'}
              </button>
            </div>
          )}
          {isLogin && (
            <div className="auth-forgot">
              <button type="button" className="auth-link">Forgot password?</button>
            </div>
          )}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '⏳ Processing...' : isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </form>

        <div className="auth-footer-new">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => navigate(isLogin ? '/register' : '/login')}
            className="auth-link"
            style={{ marginLeft: '6px' }}
          >
            {isLogin ? 'Create account' : 'Sign In'}
          </button>
        </div>
        <div className="corner-glow-new" />
      </div>
    </div>
  )
}