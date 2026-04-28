import { Link } from 'react-router-dom';

export default function Cookies() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #1e3a8a 100%)', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: 64, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem' }}>← itopy.ai</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 120px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8 }}>Política de Cookies</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Última actualización: abril 2026</p>

        <Section title="1. ¿Qué son las cookies?">
          <p>Las cookies son pequeños archivos de texto que se almacenan en el navegador del usuario al visitar un sitio web. Permiten recordar preferencias, analizar el uso del sitio y mejorar la experiencia de navegación.</p>
        </Section>

        <Section title="2. Cookies que utilizamos">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#a78bfa', fontSize: '0.85rem' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#a78bfa', fontSize: '0.85rem' }}>Tipo</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#a78bfa', fontSize: '0.85rem' }}>Finalidad</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#a78bfa', fontSize: '0.85rem' }}>Duración</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <td style={{ padding: '10px 12px' }}>sb-*</td>
                <td style={{ padding: '10px 12px' }}>Técnica</td>
                <td style={{ padding: '10px 12px' }}>Autenticación Supabase (sesión de usuario)</td>
                <td style={{ padding: '10px 12px' }}>Sesión</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <td style={{ padding: '10px 12px' }}>utm_*</td>
                <td style={{ padding: '10px 12px' }}>Analítica</td>
                <td style={{ padding: '10px 12px' }}>Seguimiento de campañas de marketing (localStorage)</td>
                <td style={{ padding: '10px 12px' }}>30 días</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="3. Tipos de cookies">
          <ul>
            <li><strong>Cookies técnicas (necesarias):</strong> permiten la navegación y el uso de funcionalidades esenciales como la autenticación. No requieren consentimiento.</li>
            <li><strong>Cookies analíticas:</strong> nos ayudan a entender cómo interactúan los usuarios con el sitio web para mejorar el servicio.</li>
          </ul>
          <p>Actualmente itopy.ai <strong>no utiliza cookies de terceros con fines publicitarios</strong>.</p>
        </Section>

        <Section title="4. ¿Cómo gestionar las cookies?">
          <p>El usuario puede configurar su navegador para bloquear o eliminar cookies. A continuación, los enlaces de ayuda de los principales navegadores:</p>
          <ul>
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
            <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
          </ul>
          <p>Desactivar las cookies técnicas puede afectar al funcionamiento del sitio web.</p>
        </Section>

        <Section title="5. Actualizaciones">
          <p>Esta política de cookies puede actualizarse periódicamente. Recomendamos revisarla de forma regular.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: '#a78bfa' }}>{title}</h2>
      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
