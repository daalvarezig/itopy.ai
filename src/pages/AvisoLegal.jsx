import { Link } from 'react-router-dom';

export default function AvisoLegal() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #1e3a8a 100%)', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: 64, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem' }}>← itopy.ai</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 120px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8 }}>Aviso Legal</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Última actualización: abril 2026</p>

        <Section title="1. Datos identificativos">
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa al usuario de los datos del titular:</p>
          <ul>
            <li><strong>Denominación social:</strong> itopy.ai SLU</li>
            <li><strong>CIF:</strong> [Pendiente de registro]</li>
            <li><strong>Domicilio social:</strong> Alcorcón, Madrid, España</li>
            <li><strong>Email:</strong> legal@itopy.ai</li>
            <li><strong>Actividad:</strong> Desarrollo y comercialización de soluciones de inteligencia artificial para automatización de la atención al cliente</li>
            <li><strong>Inscripción registral:</strong> [Pendiente de inscripción en el Registro Mercantil de Madrid]</li>
          </ul>
        </Section>

        <Section title="2. Objeto">
          <p>El presente sitio web (itopy.ai) tiene como finalidad informar sobre los servicios ofrecidos por itopy.ai SLU, consistentes en asistentes virtuales basados en inteligencia artificial para la automatización de la comunicación comercial a través de WhatsApp, Telegram y otros canales de mensajería.</p>
        </Section>

        <Section title="3. Propiedad intelectual e industrial">
          <p>Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico, logotipos, iconos, código fuente, software y demás elementos, son propiedad de itopy.ai SLU o de sus legítimos titulares, y están protegidos por las leyes de propiedad intelectual e industrial vigentes.</p>
          <p>Queda prohibida la reproducción, distribución, comunicación pública o transformación, total o parcial, de los contenidos sin autorización expresa y por escrito de itopy.ai SLU.</p>
        </Section>

        <Section title="4. Condiciones de uso">
          <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios del sitio web, absteniéndose de:</p>
          <ul>
            <li>Utilizar los contenidos con fines ilícitos o contrarios a la buena fe.</li>
            <li>Introducir virus u otros elementos que puedan dañar los sistemas informáticos del proveedor o de terceros.</li>
            <li>Intentar acceder a áreas restringidas sin autorización.</li>
            <li>Suplantar la identidad de otros usuarios.</li>
          </ul>
        </Section>

        <Section title="5. Exoneración de responsabilidad">
          <p>itopy.ai SLU no se hace responsable de:</p>
          <ul>
            <li>Los daños o perjuicios derivados del uso incorrecto del servicio por parte del usuario.</li>
            <li>La disponibilidad continua e ininterrumpida del sitio web o de los servicios de IA.</li>
            <li>Las respuestas generadas por los asistentes de inteligencia artificial, que son orientativas y no constituyen asesoramiento profesional de ningún tipo.</li>
            <li>Los resultados comerciales obtenidos por el cliente mediante el uso del servicio.</li>
            <li>El contenido de sitios web de terceros enlazados desde este sitio.</li>
          </ul>
        </Section>

        <Section title="6. Modificaciones">
          <p>itopy.ai SLU se reserva el derecho a modificar el contenido del sitio web y del presente aviso legal en cualquier momento y sin previo aviso. Las modificaciones serán efectivas desde su publicación.</p>
        </Section>

        <Section title="7. Legislación aplicable y jurisdicción">
          <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de la ciudad de Madrid, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
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
