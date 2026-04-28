/* apps/ai-receptionist/src/pages/LandingPage.jsx */
import { useState, useEffect } from 'react';
import { getStoredUTMs, captureUTMs } from '../utils/marketing';

const ICONS = {
  rocket: '/icons/icono_01.png', analytics: '/icons/icono_02.png', chat: '/icons/icono_03.png',
  feat_ai: '/icons/icono_04.png', feat_cal: '/icons/icono_05.png', feat_dash: '/icons/icono_06.png',
  feat_int: '/icons/icono_07.png', feat_glob: '/icons/icono_08.png', feat_sec: '/icons/icono_09.png',
  multicanal: '/icons/icono_03.png', bell: '/icons/icono_04.png', folder: '/icons/icono_07.png',
  copy: '/icons/icono_07.png',
};

// Preguntas y respuestas enfocadas a Pymes
const MOCK_ANSWERS = {
  '¿Cómo ayuda itopy.ai a mi comercio?': 'Automatizamos tu WhatsApp y Telegram 24/7 para que no pierdas ventas por falta de respuesta. ¡Atendemos clientes mientras tú descansas o atiendes en tienda!',
  '¿Necesito un número nuevo?': 'No es obligatorio. Puedes vincular tu número de WhatsApp actual o usar uno nuevo si prefieres separar lo personal de lo profesional.',
  '¿Qué pasa si quiero hablar yo?': 'Tienes control total. Desde nuestro panel de Chatwoot puedes ver todas las conversaciones y tomar el mando en cualquier momento. El bot se detendrá automáticamente.',
  '¿Es compatible con mi negocio?': '¡Claro! Somos especialistas en peluquerías, restaurantes, retail y cualquier comercio local que reciba consultas por chat.',
};

const FAQ_DATA = [
  { q: '¿Cómo funciona exactamente itopy.ai?', a: 'Instalamos un asistente de IA que se conecta a tu WhatsApp. Responde dudas, da precios y hasta agenda citas consultando tu calendario en tiempo real.' },
  { q: '¿Es difícil de configurar?', a: 'Para nada. Nosotros nos encargamos de la integración técnica y el entrenamiento inicial. Tú solo decides qué quieres que responda la IA.' },
  { q: '¿Funciona también en Telegram?', a: 'Sí, podemos desplegar el mismo asistente en Telegram, ideal para soporte técnico o comunidades de clientes.' },
  { q: '¿Qué coste tiene el servicio?', a: 'itopy.ai se amortiza solo capturando una única venta al mes que antes perdías por no contestar a tiempo. ¡Desde menos de 2€ al día!' },
];

const CHAT_LOG = [
  { type: 'ai', text: '¡Hola! Bienvenido a itopy.ai. ¿En qué puedo ayudarte hoy?' },
  { type: 'user', text: 'Hola, quería saber si esto sirve para mi peluquería.' },
  { type: 'ai', text: '¡Claro que sí! Podemos gestionar tus citas por WhatsApp 24/7. ¿Te gustaría ver cómo funciona?' },
  { type: 'user', text: 'Sí, eso sería genial. ¿Y si preguntan por precios?' },
  { type: 'ai', text: 'También puedo responderles con tu lista de precios actualizada al instante. ¡Tú ahorras tiempo y el cliente queda feliz!' },
];

const SVG_ICONS = {
  calendar: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="12" width="52" height="46" rx="8" fill="#6366f1" opacity="0.15"/><rect x="6" y="12" width="52" height="46" rx="8" stroke="#6366f1" strokeWidth="3"/><rect x="6" y="20" width="52" height="12" fill="#6366f1" opacity="0.7"/><line x1="20" y1="6" x2="20" y2="20" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round"/><line x1="44" y1="6" x2="44" y2="20" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round"/><circle cx="22" cy="42" r="4" fill="#6366f1"/><circle cx="32" cy="42" r="4" fill="#8b5cf6"/><circle cx="42" cy="42" r="4" fill="#a78bfa"/><circle cx="22" cy="52" r="4" fill="#a78bfa"/><circle cx="32" cy="52" r="4" fill="#6366f1"/></svg> ),
  chat: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="44" height="34" rx="10" fill="#6366f1" opacity="0.2"/><rect x="4" y="6" width="44" height="34" rx="10" stroke="#6366f1" strokeWidth="3"/><path d="M8 40 L4 52 L18 44" fill="#6366f1" opacity="0.5"/><circle cx="16" cy="23" r="4" fill="#6366f1"/><circle cx="26" cy="23" r="4" fill="#8b5cf6"/><circle cx="36" cy="23" r="4" fill="#a78bfa"/><rect x="18" y="30" width="28" height="28" rx="8" fill="#8b5cf6" opacity="0.2"/><rect x="18" y="30" width="28" height="28" rx="8" stroke="#8b5cf6" strokeWidth="2.5"/><path d="M42 58 L46 62 L46 50" fill="#8b5cf6" opacity="0.5"/></svg> ),
  bell: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6 C20 6 14 16 14 26 L14 40 L8 46 L56 46 L50 40 L50 26 C50 16 44 6 32 6Z" fill="#6366f1" opacity="0.2"/><path d="M32 6 C20 6 14 16 14 26 L14 40 L8 46 L56 46 L50 40 L50 26 C50 16 44 6 32 6Z" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round"/><circle cx="32" cy="4" r="4" fill="#8b5cf6"/><path d="M26 46 Q26 54 32 54 Q38 54 38 46" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="44" cy="14" r="8" fill="#f59e0b"/><text x="44" y="18" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">3</text></svg> ),
  star: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="32,4 39,24 60,24 44,37 50,58 32,45 14,58 20,37 4,24 25,24" fill="#6366f1" opacity="0.25"/><polygon points="32,4 39,24 60,24 44,37 50,58 32,45 14,58 20,37 4,24 25,24" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round"/><polygon points="32,12 37,26 52,26 40,35 45,50 32,41 19,50 24,35 12,26 27,26" fill="#8b5cf6" opacity="0.5"/></svg> ),
  check: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#6366f1" opacity="0.15"/><circle cx="32" cy="32" r="26" stroke="#6366f1" strokeWidth="3"/><polyline points="18,32 27,42 46,22" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
  bolt: ( <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="36,4 14,36 30,36 28,60 50,28 34,28" fill="#8b5cf6" opacity="0.3"/><polygon points="36,4 14,36 30,36 28,60 50,28 34,28" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round"/><polygon points="36,10 18,36 31,36 29,54 48,30 35,30" fill="#6366f1" opacity="0.5"/></svg> ),
  whatsapp: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/></svg> ),
};

const FLOATING = [ { svg: 'calendar', top: '18%', left: '4%', size: 72, delay: '0s' }, { svg: 'chat', top: '38%', left: '2%', size: 64, delay: '1s' }, { svg: 'check', top: '62%', left: '5%', size: 68, delay: '2s' }, { svg: 'bell', top: '15%', right: '4%', size: 68, delay: '0.5s' }, { svg: 'bolt', top: '42%', right: '2%', size: 72, delay: '1.5s' }, { svg: 'star', top: '68%', right: '5%', size: 62, delay: '2.5s' } ];

const CARDS = [
  { icon: ICONS.rocket, title: 'Citas IA', gradient: 'linear-gradient(135deg, #4f8ef7 0%, #6c63ff 60%, #a78bfa 100%)', desc: 'Gestión de citas ', descBold: 'sin esfuerzo', descRest: ' gracias a un asistente impulsado por IA' },
  { icon: ICONS.analytics, title: 'Analytics', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 60%, #c084fc 100%)', desc: 'Dashboard de desempeño ', descBold: '', descRest: 'con datos en tiempo real' },
  { icon: ICONS.multicanal, title: 'Multicanal', gradient: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 60%, #818cf8 100%)', desc: 'Chat en vivo, WhatsApp ', descBold: '', descRest: 'y más para una atención omnicanal' },
];

const STATS = [
  { value: '98%', label: 'Satisfacción' },
  { value: '24/7', label: 'Disponibilidad' },
  { value: '+500', label: 'Clientes atendidos' },
  { value: '<1s',  label: 'Tiempo de respuesta' },
];

const FEATURES = [
  { icon: ICONS.feat_ai, title: 'IA Conversacional', desc: 'Responde consultas 24/7 con lenguaje natural avanzado.' },
  { icon: ICONS.feat_cal, title: 'Gestión de Citas', desc: 'Agenda, modifica y cancela citas automáticamente.' },
  { icon: ICONS.feat_dash, title: 'Analytics en Tiempo Real', desc: 'Dashboard con métricas de interacciones y rendimiento.' },
  { icon: ICONS.feat_int, title: 'Integraciones', desc: 'Conecta con CRM, calendarios y sistemas existentes.' },
  { icon: ICONS.feat_glob, title: 'Multicanal', desc: 'Web, WhatsApp, Telegram y más desde un solo panel.' },
  { icon: ICONS.feat_sec, title: 'Seguridad Total', desc: 'Datos cifrados y cumplimiento GDPR garantizado.' },
];

const handleWhatsAppClick = async (contexto) => {
  const utms = getStoredUTMs();

  // 🚀 Mandamos el evento a n8n para guardarlo en Supabase
  // No usamos await para que el usuario no espere y abra WhatsApp rápido
  fetch("https://n8n.itopy.ai/webhook/landing-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: 'whatsapp_click',
      source: contexto, // 'boton_central' o 'flotante'
      ...utms
    })
  });

  // 📱 Abrimos WhatsApp con tu número
  const text = contexto === 'boton_central'
    ? "Hola, necesito automatizar mi comercio"
    : "Hola, vengo de la web y tengo una pregunta";
  window.open(`https://wa.me/34694206264?text=${encodeURIComponent(text)}`, '_blank');
};


function FloatingIcon({ svg, top, left, right, size, delay }) { return ( <div style={{ position: 'absolute', top, left, right, width: size, height: size, filter: 'drop-shadow(0 6px 18px rgba(99,102,241,0.3))', animation: 'floatY 4s ease-in-out infinite', animationDelay: delay, pointerEvents: 'none', zIndex: 2 }}>{SVG_ICONS[svg]}</div> ); }

function BentoCard({ card }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 28, overflow: 'hidden', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(255,255,255,0.4)', transform: hovered ? 'translateY(-8px) scale(1.01)' : 'none', transition: 'all 0.35s ease', cursor: 'pointer', flex: '1 1 280px', minWidth: 260, maxWidth: 360 }}>
      <div style={{ height: 180, background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px', gap: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: 80, height: 80, flexShrink: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={card.icon} alt={card.title} style={{ width: 56, height: 56, objectFit: 'contain' }} /></div>
        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{card.title}</span>
      </div>
      <div style={{ height: 180, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><p style={{ color: '#fff', margin: 0 }}>{card.desc}<strong>{card.descBold}</strong>{card.descRest}</p></div>
    </div>
  );
}

function FeatureCard({ feat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 20, padding: '28px 24px', background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)', transition: '0.3s' }}>
      <div style={{ width: 72, height: 72, marginBottom: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={feat.icon} alt={feat.title} style={{ width: 50, height: 50, objectFit: 'contain' }} /></div>
      <div style={{ fontWeight: 700, color: '#fff', marginBottom: 8 }}>{feat.title}</div>
      <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>{feat.desc}</div>
    </div>
  );
}

function LiveChatDemo() {
  const [msgList, setMsgList] = useState([]);
  const [curr, setCurr] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (curr >= CHAT_LOG.length) {
      setTimeout(() => { setMsgList([]); setCurr(0); }, 3000);
      return;
    }
    setTyping(true);
    const time = CHAT_LOG[curr].text.length * 30 + 500;
    const t = setTimeout(() => {
      setTyping(false);
      setMsgList(prev => [...prev, CHAT_LOG[curr]]);
      setCurr(prev => prev + 1);
    }, time);
    return () => clearTimeout(t);
  }, [curr]);

  return (
    <div style={{ background: '#E5DDD5', borderRadius: 24, padding: 20, maxWidth: 380, margin: '40px auto', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', height: 480, display: 'flex', flexDirection: 'column', position: 'relative', border: '8px solid #333' }}>
      <div style={{ background: '#075E54', color: '#fff', padding: '12px 16px', borderRadius: '10px 10px 0 0', margin: '-20px -20px 15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, background: '#fff', borderRadius: '50%', color: '#075E54', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
          <img
            src="/avatar_02.png"
            alt="avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div style={{fontSize: 14}}>V@ns AI</div>
      </div>
      <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 10 }}>
        {msgList.map((m, i) => (
          <div key={i} style={{ padding: '10px 14px', borderRadius: 12, maxWidth: '85%', fontSize: '13.5px', alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start', background: m.type === 'user' ? '#DCF8C6' : '#fff', borderRadius: m.type === 'user' ? '12px 12px 0 12px' : '0 12px 12px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', animation: 'fadeIn 0.3s ease-out' }}>
            {m.text}
            <div style={{ fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: 4 }}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
        ))}
        {typing && <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', marginLeft: 4 }}>Escribiendo...</div>}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ marginBottom: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 20, border: '1.5px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, color: '#fff' }}>
        {q} <span style={{ transition: '0.3s', transform: open ? 'rotate(180deg)' : 'none', color: '#8b5cf6' }}>▼</span>
      </div>
      {open && <div style={{ padding: '0 24px 20px', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6, animation: 'fadeIn 0.3s' }}>{a}</div>}
    </div>
  );
}

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 🔍 CAPTURAR UTMs AL CARGAR
    captureUTMs();

    const handleS = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleS);
    const handleM = (e) => { if (e.clientY < 5 && !showExit) setShowExit(true); };
    document.addEventListener('mousemove', handleM);
    return () => { window.removeEventListener('scroll', handleS); document.removeEventListener('mousemove', handleM); };
  }, [showExit]);

  const handleSug = (s) => {
    setQuery(s); setResponse(''); setIsTyping(true);
    setTimeout(() => { setResponse(MOCK_ANSWERS[s]); setIsTyping(false); }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden', background: `radial-gradient(ellipse at top left, #1a6fd4 0%, #3b9eff 18%, transparent 45%), radial-gradient(ellipse at top right, #87ceeb 0%, #60b8f5 20%, transparent 45%), radial-gradient(ellipse at bottom right, #7c3aed 0%, #a855f7 20%, transparent 50%), radial-gradient(ellipse at left center, #f97316 0%, #fb923c 15%, transparent 40%), linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #e0f2fe 50%, #c4b5fd 75%, #7c3aed 100%)` }}>
      {/* EXIT MODAL */}
      {showExit && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', color: '#1e3a8a', padding: 40, borderRadius: 28, textAlign: 'center', width: 400 }}>
            <h2>¡Espera! 🎁</h2>
            <p>Prueba itopy.ai gratis hoy mismo.</p>
            <button onClick={() => window.location.href='https://app.itopy.ai/login?mode=register'} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>PROBAR GRATIS</button>
            <button onClick={() => setShowExit(false)} style={{ marginTop: 20, background: 'none', border: 'none', opacity: 0.5, cursor: 'pointer' }}>No, gracias.</button>
          </div>
        </div>
      )}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.35), transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.3), transparent 70%)', filter: 'blur(50px)' }} />
      </div>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
        {FLOATING.map((f, i) => <FloatingIcon key={i} {...f} />)}
      </div>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, background: scrolled ? 'rgba(255,255,255,0.15)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.3)' : 'none', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', padding: 2, background: 'conic-gradient(from 0deg, #00f2ff, #7000ff, #00f2ff)', animation: 'rotNeo 3s linear infinite', boxShadow: '0 0 10px #00f2ff' }} />
            <img src="/avatar.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%', zIndex: 2, objectFit: 'cover', border: '1.5px solid #1e3a8a' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', textShadow: '0 0 10px #00f2ff' }}>Agencia de inteligencia artificial</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}> {['Productos', 'Precios', 'Blog'].map(item => <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none' }}>{item}</a>)} </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => window.location.href='https://app.itopy.ai/login?mode=login'} style={{ padding: '8px 20px', borderRadius: 50, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Iniciar Sesión</button>
          <button onClick={() => window.location.href='https://app.itopy.ai/login?mode=register'} style={{ padding: '8px 20px', borderRadius: 50, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: '#fff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Comenzar</button>
        </div>
      </nav>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <section style={{ textAlign: 'center', padding: '80px 24px 60px' }}>
          <div style={{ maxWidth: 850, margin: '0 auto 16px', textAlign: 'center' }}>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 12
            }}>
              ¿Cuántas ventas has perdido por no poder responder el WhatsApp o el teléfono mientras atendías a tus clientes?
            </h1>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 12
            }}>
              ¿O por ser ya las 22:00?
            </h2>

            <h3 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 12
            }}>
              Cada minuto que tardas en contestar es una oportunidad para la competencia.
            </h3>

            <p style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12
            }}>
              Con itopy.ai estarás conectado 24/7 para que nunca se escape una venta.
            </p>

          </div>
          <div style={{ maxWidth: 620, margin: '40px auto 20px', background: 'rgba(255,255,255,0.15)', borderRadius: 28, border: '2px solid rgba(255,255,255,0.4)', padding: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 22, border: '1px solid rgba(255,255,255,0.3)', padding: '10px 16px', gap: 12 }}>
              <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>🔍</span>
              <input value={query} readOnly placeholder="Pregunta a itopy.ai..." style={{ flex: 1, border: 'none', outline: 'none', color: '#fff', background: 'transparent' }} />
              <button onClick={() => window.location.href = 'https://app.itopy.ai/login?mode=login'} style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', cursor: 'pointer', color: '#fff' }}>➤</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 56 }}>
            {Object.keys(MOCK_ANSWERS).map((s) => <button key={s} onClick={() => handleSug(s)} style={{ padding: '8px 18px', borderRadius: 50, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>{s}</button>)}
          </div>
          {(isTyping || response) && (
            <div style={{ maxWidth: 620, margin: '20px auto', padding: 24, background: 'rgba(255,255,255,0.95)', borderRadius: 24, color: '#1e3a8a', textAlign: 'left', animation: 'fadeIn 0.3s', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ fontWeight: 800, color: '#6366f1', marginBottom: 8 }}>itopy.ai dice:</div>
              {isTyping ? 'Analizando...' : response}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', marginBottom: 72 }}>
            {STATS.map((s) => <div key={s.label} style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{s.value}</div><div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>{s.label}</div></div>)}
          </div>

          {/* CHAT DEMO SECTION */}
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Mira cómo atiende itopy.ai</h2>
            <LiveChatDemo />
          </div>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 1100, margin: '80px auto 0' }}> {CARDS.map((card) => <BentoCard key={card.title} card={card} />)} </div>

          <div style={{ maxWidth: 1100, margin: '120px auto 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 40 }}>Preguntas Frecuentes</h2>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
              {FAQ_DATA.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>

          <div style={{ maxWidth: 1100, margin: '120px auto 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 40 }}>Todo lo que necesitas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 80 }}> {FEATURES.map((f) => <FeatureCard key={f.title} feat={f} />)} </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 28, padding: '60px 40px', maxWidth: 600, margin: '0 auto 80px' }}>
              <h3 style={{ fontSize: '2.3rem', fontWeight: 800, color: '#fff' }}>¿Listo para empezar?</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 10 }}>Únete a cientos de comercios que ya están automatizando su atención.</p>
              <button onClick={() => handleWhatsAppClick('boton_central')} style={{ padding: '14px 40px', borderRadius: 50, background: 'linear-gradient(135deg, #25D366, #128C7E)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', marginTop: 30, boxShadow: '0 8px 20px rgba(37,211,102,0.4)', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24 }}>{SVG_ICONS.whatsapp}</div>
                Hablar con el Asistente
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <div 
        onClick={() => handleWhatsAppClick('flotante')}
        style={{ position: 'fixed', bottom: 30, right: 30, width: 64, height: 64, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 30px rgba(37,211,102,0.5)', cursor: 'pointer', zIndex: 1000, transition: '0.3s', transform: 'scale(1)' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{ width: 32, height: 32 }}>{SVG_ICONS.whatsapp}</div>
      </div>
      <style>{`
        @keyframes rotNeo { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); borderRadius: 10px; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>
    </div>
  );
}
