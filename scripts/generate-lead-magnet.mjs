#!/usr/bin/env node
// Genera public/lead-magnet.pdf con @react-pdf/renderer
// USO: cd /opt/itopy.ai/apps/itopy.ai && node scripts/generate-lead-magnet.mjs

import { renderToFile, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import React from 'react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Helvetica (built-in en ReactPDF, soporta acentos castellano)

const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  accent: '#a78bfa',
  text: '#1f2937',
  muted: '#6b7280',
  border: '#e5e7eb',
  bg: '#ffffff',
  bgAlt: '#f9fafb',
}

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 11, color: COLORS.text, padding: 0, backgroundColor: COLORS.bg },
  cover: { padding: 60, backgroundColor: COLORS.primary, color: '#fff', height: '100%', flexDirection: 'column', justifyContent: 'space-between' },
  coverHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: { fontSize: 14, fontWeight: "bold", letterSpacing: 1 },
  coverTitle: { fontSize: 38, fontWeight: "bold", lineHeight: 1.1, marginTop: 80 },
  coverSub: { fontSize: 16, marginTop: 16, opacity: 0.9, lineHeight: 1.5 },
  coverFooter: { fontSize: 10, opacity: 0.7 },
  body: { padding: '40 50' },
  intro: { fontSize: 13, lineHeight: 1.6, color: COLORS.muted, marginBottom: 30 },
  h2: { fontSize: 14, fontWeight: "bold", color: COLORS.primary, marginBottom: 6 },
  ideaBlock: { marginBottom: 24, borderLeft: `3pt solid ${COLORS.primary}`, paddingLeft: 14 },
  ideaNum: { fontSize: 22, fontWeight: "bold", color: COLORS.primary, marginBottom: 4 },
  ideaTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },
  ideaText: { fontSize: 11, lineHeight: 1.55, color: COLORS.text },
  ideaTag: { fontSize: 9, color: COLORS.muted, marginTop: 6, fontWeight: "bold", letterSpacing: 0.5, textTransform: 'uppercase' },
  ctaBox: { backgroundColor: COLORS.bgAlt, padding: 24, borderRadius: 8, marginTop: 30 },
  ctaTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary, marginBottom: 8 },
  ctaText: { fontSize: 12, lineHeight: 1.55, marginBottom: 12 },
  ctaLink: { color: COLORS.primaryDark, fontWeight: "bold" },
  footer: { position: 'absolute', bottom: 20, left: 50, right: 50, fontSize: 9, color: COLORS.muted, textAlign: 'center', borderTop: `1pt solid ${COLORS.border}`, paddingTop: 8 },
})

const IDEAS = [
  { titulo: 'Atención WhatsApp 24/7 con IA', tag: 'Servicio · Conversión',
    texto: 'Un agente de IA conectado a tu WhatsApp Business responde a clientes a cualquier hora con la voz de tu negocio: información, precios, citas, dudas. Filtra lo trivial, te pasa solo lo importante. Reduce tiempo de respuesta de horas a segundos. Conversión en horario nocturno se multiplica.' },
  { titulo: 'Reserva de citas automatizada', tag: 'Operaciones',
    texto: 'El cliente pide cita por WhatsApp/web/Instagram. La IA consulta tu agenda real, ofrece huecos, confirma y crea el evento. Cero llamadas, cero olvidos. Recordatorio automático 24h antes. Ideal para peluquerías, clínicas, talleres, restaurantes.' },
  { titulo: 'Resumen diario por Telegram', tag: 'Productividad',
    texto: 'Cada mañana a las 8:00 recibes en tu Telegram: tareas pendientes, agenda del día, emails que requieren respuesta, leads sin contactar. Toda la información que necesitas en un único mensaje. Decides el día desde el café, no desde 5 apps.' },
  { titulo: 'Captura inteligente de leads de Instagram', tag: 'Marketing',
    texto: 'Cuando alguien comenta o envía DM con palabras clave (precios, presupuesto, info), un workflow extrae el contacto, lo enriquece con datos públicos y lo mete en tu pipeline con una notificación al móvil. Cero leads perdidos en la maraña de DMs.' },
  { titulo: 'Generación de contenido para redes asistido por IA', tag: 'Marketing',
    texto: 'Le pides "10 hooks anti-scroll para barbería de Madrid" y te devuelve un calendario de contenido ya programado en Google Sheets. Tu plataforma de publicación los recoge y publica solo. Una hora a la semana basta para generar contenido para todo el mes.' },
  { titulo: 'Respuesta automática a reseñas Google', tag: 'Reputación',
    texto: 'La IA detecta nuevas reseñas, las clasifica por sentimiento y redacta una respuesta en tu tono. Tú apruebas con un click. Las negativas las eleva a humano con un análisis de la causa. Mejora SEO local sin que te suponga tiempo.' },
  { titulo: 'Recordatorio de pagos a proveedores y facturas pendientes', tag: 'Finanzas',
    texto: 'La IA escanea tu Gmail buscando facturas, las cataloga, te avisa de vencimientos próximos y prepara borradores de pago. Cero recargos por descuido. Visión clara de tu tesorería sin abrir Excel.' },
  { titulo: 'Onboarding automatizado de clientes', tag: 'Operaciones',
    texto: 'Cuando un cliente firma contrato, se dispara una secuencia: email de bienvenida personalizado, creación de carpeta Drive, invitación a Slack/grupo WhatsApp, alta en CRM, primera reunión agendada. Todo sin que muevas un dedo.' },
  { titulo: 'Análisis de conversaciones para detectar fricciones', tag: 'Calidad',
    texto: 'La IA analiza las últimas 100 conversaciones con clientes y te dice las 3 dudas más frecuentes que NO están resueltas en tu web. Convierte eso en una sección FAQ que resuelve solo el 30% de las consultas futuras.' },
  { titulo: 'Avisos proactivos de eventos importantes', tag: 'Productividad',
    texto: 'Antes de que ocurra: 30 min antes de cada cita avisa con la info del cliente, la última conversación y un guión sugerido. La noche antes de un viaje, un resumen de reservas + tiempo. La IA es el mejor asistente personal que has tenido nunca.' },
]

const Cover = () => (
  React.createElement(View, { style: styles.cover },
    React.createElement(View, { style: styles.coverHeader },
      React.createElement(Text, { style: styles.brand }, 'itopy.ai')
    ),
    React.createElement(View, null,
      React.createElement(Text, { style: styles.coverTitle }, '10 automatizaciones que tu negocio puede tener mañana'),
      React.createElement(Text, { style: styles.coverSub }, 'Ideas reales, listas para implementar.\nSin tecnicismos. Sin promesas vacías. Solo lo que funciona.')
    ),
    React.createElement(Text, { style: styles.coverFooter }, 'Una guía práctica de itopy.ai · 2026')
  )
)

const Idea = ({ n, titulo, texto, tag }) => (
  React.createElement(View, { style: styles.ideaBlock, wrap: false },
    React.createElement(Text, { style: styles.ideaNum }, String(n).padStart(2, '0')),
    React.createElement(Text, { style: styles.ideaTitle }, titulo),
    React.createElement(Text, { style: styles.ideaText }, texto),
    React.createElement(Text, { style: styles.ideaTag }, tag)
  )
)

const ContentPage = () => (
  React.createElement(View, { style: styles.body },
    React.createElement(Text, { style: styles.h2 }, 'Las 10 automatizaciones'),
    React.createElement(Text, { style: styles.intro },
      'No hay magia. Son flujos que combinan herramientas que ya existen (WhatsApp, Google Calendar, IA) para quitarte trabajo de encima. Cada idea está pensada para negocios pequeños y medianos que no quieren contratar un equipo de programadores.'
    ),
    ...IDEAS.map((idea, i) =>
      React.createElement(Idea, { key: i, n: i + 1, ...idea })
    )
  )
)

const CTAPage = () => (
  React.createElement(View, { style: styles.body },
    React.createElement(View, { style: styles.ctaBox },
      React.createElement(Text, { style: styles.ctaTitle }, '¿Cuál de las 10 quieres montar primero?'),
      React.createElement(Text, { style: styles.ctaText },
        'En itopy.ai diseñamos e implementamos automatizaciones a medida para PYMES y negocios locales. Sin permanencia, sin costes ocultos. Mes gratis de prueba — si no convence, no pagas.'
      ),
      React.createElement(Text, { style: styles.ctaText },
        React.createElement(Text, null, 'Web: '),
        React.createElement(Text, { style: styles.ctaLink }, 'itopy.ai')
      ),
      React.createElement(Text, { style: styles.ctaText },
        React.createElement(Text, null, 'WhatsApp: '),
        React.createElement(Text, { style: styles.ctaLink }, '+34 694 206 264')
      ),
      React.createElement(Text, { style: styles.ctaText },
        React.createElement(Text, null, 'Email: '),
        React.createElement(Text, { style: styles.ctaLink }, 'hola@itopy.ai')
      )
    )
  )
)

const PageFooter = () =>
  React.createElement(Text, {
    style: styles.footer,
    render: ({ pageNumber, totalPages }) => `itopy.ai · ${pageNumber} / ${totalPages}`,
    fixed: true,
  })

const Doc = () =>
  React.createElement(Document, null,
    React.createElement(Page, { size: 'A4', style: styles.page },
      React.createElement(Cover, null)
    ),
    React.createElement(Page, { size: 'A4', style: styles.page },
      React.createElement(ContentPage, null),
      React.createElement(PageFooter, null)
    ),
    React.createElement(Page, { size: 'A4', style: styles.page },
      React.createElement(CTAPage, null),
      React.createElement(PageFooter, null)
    )
  )

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/lead-magnet.pdf')

await renderToFile(React.createElement(Doc), out)
console.log(`✓ PDF generado: ${out}`)
