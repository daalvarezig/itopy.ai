import { Link } from 'react-router-dom';

export default function Privacidad() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #1e3a8a 100%)', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: 64, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem' }}>← itopy.ai</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 120px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8 }}>Política de Privacidad</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Última actualización: abril 2026</p>

        <Section title="1. Responsable del tratamiento">
          <ul>
            <li><strong>Responsable:</strong> itopy.ai SLU</li>
            <li><strong>CIF:</strong> [Pendiente de registro]</li>
            <li><strong>Domicilio:</strong> Alcorcón, Madrid, España</li>
            <li><strong>Email de contacto:</strong> privacidad@itopy.ai</li>
          </ul>
        </Section>

        <Section title="2. Datos que recopilamos">
          <p>En función de la interacción con nuestros servicios, podemos recopilar:</p>
          <ul>
            <li><strong>Datos identificativos:</strong> nombre, email, teléfono, cargo, nombre de empresa.</li>
            <li><strong>Datos profesionales:</strong> web del negocio, facturación aproximada, tamaño del equipo.</li>
            <li><strong>Datos de uso:</strong> horas dedicadas a tareas repetitivas, coste/hora estimado, desafíos del negocio.</li>
            <li><strong>Datos de navegación:</strong> parámetros UTM, dirección IP, tipo de navegador, páginas visitadas.</li>
            <li><strong>Datos de conversación:</strong> mensajes intercambiados con los asistentes de IA a través de WhatsApp u otros canales, necesarios para la prestación del servicio.</li>
          </ul>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <p>Los datos personales se tratan con las siguientes finalidades:</p>
          <ul>
            <li>Atender solicitudes de información y contacto.</li>
            <li>Preparar y enviar propuestas comerciales personalizadas.</li>
            <li>Prestar el servicio contratado de asistente virtual con IA.</li>
            <li>Mejorar nuestros productos y servicios mediante análisis agregados.</li>
            <li>Enviar comunicaciones comerciales (solo con consentimiento previo).</li>
          </ul>
        </Section>

        <Section title="4. Base legal del tratamiento">
          <ul>
            <li><strong>Consentimiento:</strong> al enviar el formulario de contacto o contratar el servicio.</li>
            <li><strong>Ejecución contractual:</strong> para la prestación del servicio contratado.</li>
            <li><strong>Interés legítimo:</strong> para el análisis de uso y mejora del servicio.</li>
          </ul>
        </Section>

        <Section title="5. Destinatarios de los datos">
          <p>Los datos pueden ser comunicados a:</p>
          <ul>
            <li><strong>Supabase Inc.</strong> — infraestructura de base de datos y autenticación (servidores en la UE).</li>
            <li><strong>Meta Platforms (WhatsApp Business API)</strong> — para la prestación del servicio de mensajería.</li>
            <li><strong>OpenAI</strong> — procesamiento de lenguaje natural para los asistentes de IA.</li>
            <li><strong>Stripe</strong> — procesamiento de pagos.</li>
          </ul>
          <p>No se cederán datos a terceros salvo obligación legal o consentimiento expreso.</p>
        </Section>

        <Section title="6. Transferencias internacionales">
          <p>Algunos de nuestros proveedores tecnológicos (OpenAI, Stripe) están ubicados en Estados Unidos. Estas transferencias se realizan bajo las garantías adecuadas conforme al RGPD, incluyendo cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
        </Section>

        <Section title="7. Plazo de conservación">
          <ul>
            <li><strong>Datos de leads:</strong> 24 meses desde la última interacción.</li>
            <li><strong>Datos de clientes:</strong> durante la vigencia del contrato y 5 años adicionales por obligaciones legales.</li>
            <li><strong>Datos de navegación:</strong> 13 meses.</li>
          </ul>
        </Section>

        <Section title="8. Derechos del interesado">
          <p>El usuario puede ejercer los siguientes derechos dirigiéndose a <strong>privacidad@itopy.ai</strong>:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos personales tratamos.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento en determinadas circunstancias.</li>
            <li><strong>Limitación:</strong> solicitar la restricción del tratamiento.</li>
            <li><strong>Portabilidad:</strong> recibir los datos en formato estructurado y de uso común.</li>
          </ul>
          <p>El usuario tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (www.aepd.es) si considera que sus derechos han sido vulnerados.</p>
        </Section>

        <Section title="9. Seguridad">
          <p>itopy.ai SLU implementa medidas técnicas y organizativas apropiadas para proteger los datos personales, incluyendo cifrado en tránsito (TLS), control de acceso basado en roles, y almacenamiento en infraestructuras certificadas.</p>
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
