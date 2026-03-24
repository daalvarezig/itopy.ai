# AI Receptionist SaaS

Stack:

Supabase (DB + Auth)
n8n (workflow)
OpenAI (AI)
WhatsApp Cloud API (canal)

Arquitectura:

Cliente
↓
WhatsApp
↓
Webhook
↓
n8n
↓
Supabase
↓
Dashboard