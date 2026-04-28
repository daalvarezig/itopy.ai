import { Link } from 'react-router-dom';

export default function Terminos() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #1e3a8a 100%)', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '0 40px', height: 64, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem' }}>← itopy.ai</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 120px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8 }}>Términos y Condiciones</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>Última actualización: abril 2026</p>

        <Section title="1. Objeto">
          <p>Los presentes Términos y Condiciones regulan el acceso y uso del sitio web itopy.ai, así como la contratación de los servicios de asistentes virtuales con inteligencia artificial ofrecidos por itopy.ai SLU.</p>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>itopy.ai proporciona soluciones de automatización de la atención al cliente mediante asistentes de inteligencia artificial integrados en canales de mensajería (WhatsApp, Telegram, web). El servicio incluye:</p>
          <ul>
            <li>Configuración e instalación del asistente virtual.</li>
            <li>Panel de gestión para el cliente.</li>
            <li>Mantenimiento y actualizaciones del sistema.</li>
            <li>Soporte técnico según el plan contratado.</li>
          </ul>
        </Section>

        <Section title="3. Contratación y precios">
          <ul>
            <li>Los precios publicados no incluyen IVA (21%).</li>
            <li>El setup (alta inicial) se cobra una sola vez al inicio del servicio.</li>
            <li>La cuota mensual se cobra por adelantado.</li>
            <li>Los planes con setup fraccionado requieren compromiso mínimo de permanencia equivalente al número de cuotas.</li>
          </ul>
        </Section>

        <Section title="4. Duración y cancelación">
          <ul>
            <li>El servicio se contrata por periodos mensuales renovables automáticamente.</li>
            <li><strong>Sin permanencia</strong> (salvo setup fraccionado): el cliente puede cancelar en cualquier momento notificándolo con 15 días de antelación.</li>
            <li>La cancelación no genera derecho a devolución de la cuota del mes en curso ni del setup.</li>
            <li>itopy.ai se reserva el derecho a suspender el servicio por impago tras 7 días naturales desde el vencimiento.</li>
          </ul>
        </Section>

        <Section title="5. Obligaciones del cliente">
          <p>El cliente se compromete a:</p>
          <ul>
            <li>Proporcionar información veraz y actualizada para la configuración del asistente.</li>
            <li>No utilizar el servicio para fines ilícitos, spam, o comunicaciones no solicitadas.</li>
            <li>Respetar la normativa de protección de datos en las interacciones con sus propios clientes.</li>
            <li>Informar a itopy.ai de cualquier incidencia o mal funcionamiento detectado.</li>
          </ul>
        </Section>

        <Section title="6. Limitación de responsabilidad">
          <p>itopy.ai SLU:</p>
          <ul>
            <li><strong>No garantiza resultados comerciales</strong> derivados del uso del servicio. La automatización mejora la eficiencia, pero los resultados dependen de múltiples factores ajenos al servicio.</li>
            <li><strong>No se responsabiliza de las respuestas generadas por la IA</strong> que puedan resultar inexactas. El cliente es responsable de supervisar y ajustar el comportamiento del asistente.</li>
            <li><strong>No garantiza disponibilidad ininterrumpida</strong> del servicio. Se realizarán los esfuerzos razonables para mantener un uptime superior al 99%, pero pueden producirse interrupciones por mantenimiento o causas de fuerza mayor.</li>
            <li><strong>No se responsabiliza de las acciones de terceros</strong> (Meta/WhatsApp, proveedores de hosting, operadores de telecomunicaciones) que puedan afectar al servicio.</li>
          </ul>
          <p>La responsabilidad máxima de itopy.ai SLU en cualquier caso estará limitada al importe total abonado por el cliente en los últimos 12 meses.</p>
        </Section>

        <Section title="7. Propiedad intelectual">
          <p>El cliente mantiene la propiedad de sus datos, contenidos y marca. itopy.ai SLU mantiene la propiedad de la tecnología, el código, los modelos de IA y la infraestructura del servicio.</p>
          <p>Al finalizar el contrato, los datos del cliente serán exportados o eliminados a su solicitud en un plazo máximo de 30 días.</p>
        </Section>

        <Section title="8. Confidencialidad">
          <p>Ambas partes se comprometen a mantener la confidencialidad de la información intercambiada durante la prestación del servicio, con una duración de 2 años tras la finalización del contrato.</p>
        </Section>

        <Section title="9. Modificaciones">
          <p>itopy.ai SLU se reserva el derecho a modificar estos términos notificando al cliente con 30 días de antelación. Si el cliente no está de acuerdo con los cambios, podrá cancelar el servicio sin penalización.</p>
        </Section>

        <Section title="10. Legislación aplicable">
          <p>Estos términos se rigen por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales de Madrid.</p>
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
