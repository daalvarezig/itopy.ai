import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../components/Particles'

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: '🤖', title: 'IA Conversacional', desc: 'Responde consultas 24/7 con lenguaje natural avanzado.' },
    { icon: '📅', title: 'Gestión de Citas', desc: 'Agenda, modifica y cancela citas automáticamente.' },
    { icon: '📊', title: 'Analytics en Tiempo Real', desc: 'Dashboard con métricas de interacciones y rendimiento.' },
    { icon: '🔗', title: 'Integraciones', desc: 'Conecta con CRM, calendarios y sistemas existentes.' },
    { icon: '🌐', title: 'Multicanal', desc: 'Web, WhatsApp, Telegram y más desde un solo panel.' },
    { icon: '🔒', title: 'Seguridad Total', desc: 'Datos cifrados y cumplimiento GDPR garantizado.' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0a1a 100%)' }}>
      <Particles />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,26,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99,102,241,0.2)' : 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            🤖
          </div>
          <span className="font-bold text-lg tracking-wide">ReceptionAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition-colors cursor-pointer">Características</a>
          <a href="#pricing" className="hover:text-white transition-colors cursor-pointer">Precios</a>
          <a href="#demo" className="hover:text-white transition-colors cursor-pointer">Demo</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            Empezar Gratis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 min-h-screen">
        <div
          className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, #6366f1 0%, #8b5cf6 40%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border"
          style={{ background: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.4)', color: '#a5b4fc' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Nuevo · Recepcionista IA disponible ahora
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 max-w-4xl">
          Recepción{' '}
          <span className="italic" style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Inteligente.
          </span>
          <br />
          Atención Sin Límites.
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
          La plataforma todo-en-uno que automatiza tu recepción con IA conversacional, gestión de citas y análisis en tiempo real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
          >
            Comenzar Ahora →
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-xl font-semibold text-base border transition-all duration-200 hover:bg-white hover:bg-opacity-5"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }}
          >
            Ver Demo
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-12 mt-20">
          {[['98%', 'Satisfacción'], ['24/7', 'Disponibilidad'], ['+500', 'Empresas'], ['<1s', 'Respuesta']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black" style={{ color: '#a78bfa' }}>{val}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Todo lo que necesitas</h2>
          <p className="text-gray-400 text-lg">Potencia tu negocio con tecnología de vanguardia</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-default"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(99,102,241,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24 text-center">
        <div
          className="max-w-2xl mx-auto p-12 rounded-3xl border"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', borderColor: 'rgba(99,102,241,0.3)' }}
        >
          <h2 className="text-4xl font-black mb-4">¿Listo para empezar?</h2>
          <p className="text-gray-400 mb-8">Únete a más de 500 empresas que ya automatizan su recepción.</p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-600 text-sm border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        © 2025 ReceptionAI · Todos los derechos reservados
      </footer>
    </div>
  )
}