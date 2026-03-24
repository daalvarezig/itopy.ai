import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([
    { id: 1, from: 'ai', text: '¡Hola! Soy tu Recepcionista IA. ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const conversations = [
    { id: 1, name: 'Consulta General', time: '2 min', preview: '¿Cuál es el horario...?', active: true },
    { id: 2, name: 'Reserva de Cita', time: '15 min', preview: 'Necesito agendar para...' },
    { id: 3, name: 'Soporte Técnico', time: '1h', preview: 'Tengo un problema con...' },
    { id: 4, name: 'Información Precios', time: '3h', preview: '¿Cuánto cuesta el plan...?' },
  ]

  const agents = [
    { icon: '📅', name: 'Gestor de Citas', desc: 'Agenda y gestiona reservas automáticamente', color: '#6366f1' },
    { icon: '💬', name: 'Atención al Cliente', desc: 'Responde FAQs y consultas generales', color: '#8b5cf6' },
    { icon: '📊', name: 'Analista de Datos', desc: 'Genera reportes e insights del negocio', color: '#38bdf8' },
    { icon: '📧', name: 'Gestor de Emails', desc: 'Redacta y envía respuestas automáticas', color: '#10b981' },
  ]

  const stats = [
    { label: 'Conversaciones Hoy', value: '247', change: '+12%', icon: '💬' },
    { label: 'Citas Agendadas', value: '38', change: '+5%', icon: '📅' },
    { label: 'Tiempo Respuesta', value: '0.8s', change: '-15%', icon: '⚡' },
    { label: 'Satisfacción', value: '98%', change: '+2%', icon: '⭐' },
  ]

  const navItems = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'agents', icon: '🤖', label: 'Agentes' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'settings', icon: '⚙️', label: 'Config' },
  ]

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const responses = [
        'Entendido. Puedo ayudarte con eso ahora mismo.',
        'Claro, déjame gestionar eso para ti.',
        'He procesado tu solicitud. ¿Necesitas algo más?',
        'Perfecto, he registrado la información. ¿Hay algo más en lo que pueda ayudarte?',
      ]
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'ai', text: responses[Math.floor(Math.random() * responses.length)] },
      ])
      setTyping(false)
    }, 1500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className="flex h-screen text-white overflow-hidden" style={{ background: '#0a0a1a' }}>
      {/* SIDEBAR */}
      <div className="flex flex-col w-64 border-r flex-shrink-0"
        style={{ background: 'rgba(15,15,35,0.95)', borderColor: 'rgba(99,102,241,0.2)' }}>
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🤖</div>
          <div>
            <div className="font-bold text-sm">ReceptionAI</div>
            <div className="text-xs text-gray-500">v4.3</div>
          </div>
        </div>

        <div className="px-4 py-3">
          <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <span>+</span> Nueva Conversación
          </button>
        </div>

        <div className="px-3 py-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1"
              style={{
                background: activeTab === item.id ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: activeTab === item.id ? '#a5b4fc' : '#9ca3af',
                borderLeft: activeTab === item.id ? '2px solid #6366f1' : '2px solid transparent',
              }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="text-xs text-gray-600 uppercase tracking-wider px-2 mb-2">Recientes</div>
          {conversations.map((c) => (
            <div key={c.id}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-1 hover:bg-white hover:bg-opacity-5"
              style={{ background: c.active ? 'rgba(99,102,241,0.1)' : 'transparent' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-200 truncate">{c.name}</span>
                  <span className="text-xs text-gray-600 ml-1 flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{c.preview}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>U</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-200">Usuario</div>
              <div className="text-xs text-gray-500">Plan Pro</div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-red-400 transition-colors text-xs"
              title="Cerrar sesión"
            >⬅️</button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ background: 'rgba(15,15,35,0.8)', borderColor: 'rgba(99,102,241,0.2)', backdropFilter: 'blur(10px)' }}>
          <div>
            <h1 className="font-bold text-lg">
              {activeTab === 'chat' && 'Chat con IA'}
              {activeTab === 'agents' && 'Agentes IA'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'settings' && 'Configuración'}
            </h1>
            <p className="text-xs text-gray-500">ReceptionAI · Activo</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">En línea</span>
          </div>
        </div>

        {/* CHAT */}
        {activeTab === 'chat' && (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                <div className="flex flex-col items-center py-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>🤖</div>
                  <h2 className="text-xl font-bold text-white">Soy tu Recepcionista IA</h2>
                  <p className="text-gray-400 text-sm mt-1">¿En qué puedo ayudarte hoy?</p>
                </div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.from === 'ai' && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-1"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🤖</div>
                    )}
                    <div className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
                      style={{
                        background: msg.from === 'user' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.07)',
                        borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      }}>{msg.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🤖</div>
                    <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-gray-400"
                            style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-6 py-4 border-t flex-shrink-0" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(99,102,241,0.3)' }}>
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-transparent text-sm outline-none text-white placeholder-gray-500" />
                  <button onClick={sendMessage}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>➤</button>
                </div>
              </div>
            </div>
            <div className="w-72 border-l overflow-y-auto p-4 flex-shrink-0"
              style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(10,10,26,0.5)' }}>
              <h3 className="text-sm font-bold text-gray-300 mb-4">Tus Agentes IA</h3>
              <div className="space-y-3">
                {agents.map((a) => (
                  <div key={a.name} className="p-3 rounded-xl border cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(99,102,241,0.2)' }}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl">{a.icon}</span>
                      <span className="text-sm font-semibold text-gray-200">{a.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AGENTS */}
        {activeTab === 'agents' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {agents.map((a) => (
                <div key={a.name} className="p-6 rounded-2xl border transition-all hover:scale-105 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(99,102,241,0.2)' }}>
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{a.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{a.desc}</p>
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                    style={{ background: `${a.color}33`, color: a.color, border: `1px solid ${a.color}55` }}>
                    Activar Agente →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="p-5 rounded-2xl border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(99,102,241,0.2)' }}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  <div className="text-xs mt-2 font-semibold"
                    style={{ color: s.change.startsWith('+') ? '#10b981' : '#f59e0b' }}>
                    {s.change} vs ayer
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(99,102,241,0.2)' }}>
              <h3 className="font-bold mb-4">Conversaciones por hora</h3>
              <div className="flex items-end gap-2 h-32">
                {[30, 55, 40, 80, 65, 90, 75, 95, 60, 45, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${h}%`, background: 'linear-gradient(to top, #6366f1, #8b5cf6)' }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                {['8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-2xl">
            {[
              { label: 'Nombre del Asistente', value: 'ReceptionAI' },
              { label: 'Idioma Principal', value: 'Español' },
              { label: 'Zona Horaria', value: 'Europe/Madrid' },
            ].map((field) => (
              <div key={field.label} className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">{field.label}</label>
                <input type="text" defaultValue={field.value}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(99,102,241,0.3)', color: 'white' }} />
              </div>
            ))}
            <button className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Guardar Cambios
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}