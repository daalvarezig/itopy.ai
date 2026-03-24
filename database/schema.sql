-- =========================================================
-- AI Receptionist SaaS (MVP)
-- Schema inicial para Supabase / PostgreSQL
-- =========================================================

-- ---------------------------------------------------------
-- 1) Extensión para UUID
-- ---------------------------------------------------------
create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- 2) Función genérica para updated_at
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------
-- 3) Tabla principal de negocios
-- ---------------------------------------------------------
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text,
  owner_email text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'suspended')),
  plan text not null default 'starter'
    check (plan in ('starter', 'pro', 'business', 'enterprise')),
  monthly_message_limit integer not null default 1000
    check (monthly_message_limit >= 0),
  system_prompt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_businesses_status on public.businesses(status);
create index if not exists idx_businesses_plan on public.businesses(plan);

create trigger trg_businesses_updated_at
before update on public.businesses
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 4) Configuración del negocio (1:1 con businesses)
-- ---------------------------------------------------------
create table if not exists public.business_settings (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null unique references public.businesses(id) on delete cascade,
  welcome_message text,
  fallback_message text,
  language text not null default 'es',
  timezone text not null default 'Europe/Madrid',
  ai_model text not null default 'gpt-4.1-mini',
  temperature numeric(3,2) not null default 0.30
    check (temperature >= 0 and temperature <= 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_business_settings_business_id
  on public.business_settings(business_id);

create trigger trg_business_settings_updated_at
before update on public.business_settings
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 5) Canales del negocio
--    Preparado para whatsapp / instagram / telegram / voice
-- ---------------------------------------------------------
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  channel_type text not null
    check (channel_type in ('whatsapp', 'instagram', 'telegram', 'voice', 'custom')),
  external_id text not null,
  display_name text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'pending')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint uq_channels_business_channel_external unique (business_id, channel_type, external_id)
);

create index if not exists idx_channels_business_id
  on public.channels(business_id);

create index if not exists idx_channels_type
  on public.channels(channel_type);

create index if not exists idx_channels_external_id
  on public.channels(external_id);

create trigger trg_channels_updated_at
before update on public.channels
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 6) Clientes del negocio
--    Entidad lógica de cliente, independiente del canal
-- ---------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text,
  notes text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_customers_business_id
  on public.customers(business_id);

create index if not exists idx_customers_last_seen_at
  on public.customers(last_seen_at desc);

create trigger trg_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 7) Puntos de contacto del cliente por canal
--    Ejemplos:
--      whatsapp -> teléfono
--      instagram -> ig_user_id
--      telegram -> telegram_user_id
--      voice -> teléfono
-- ---------------------------------------------------------
create table if not exists public.contact_points (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  channel_id uuid not null references public.channels(id) on delete cascade,
  external_user_id text not null,
  display_name text,
  is_primary boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint uq_contact_points_channel_external unique (channel_id, external_user_id)
);

create index if not exists idx_contact_points_customer_id
  on public.contact_points(customer_id);

create index if not exists idx_contact_points_channel_id
  on public.contact_points(channel_id);

create index if not exists idx_contact_points_external_user_id
  on public.contact_points(external_user_id);

create trigger trg_contact_points_updated_at
before update on public.contact_points
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 8) Agentes humanos (futuro / handoff)
-- ---------------------------------------------------------
create table if not exists public.human_agents (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  full_name text not null,
  email text,
  role text not null default 'agent'
    check (role in ('agent', 'manager', 'admin')),
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_human_agents_business_id
  on public.human_agents(business_id);

create index if not exists idx_human_agents_status
  on public.human_agents(status);

create trigger trg_human_agents_updated_at
before update on public.human_agents
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 9) Base de conocimiento / FAQs
-- ---------------------------------------------------------
create table if not exists public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  question text not null,
  answer text not null,
  category text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_knowledge_base_business_id
  on public.knowledge_base(business_id);

create index if not exists idx_knowledge_base_business_active
  on public.knowledge_base(business_id, is_active);

create index if not exists idx_knowledge_base_category
  on public.knowledge_base(category);

create trigger trg_knowledge_base_updated_at
before update on public.knowledge_base
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 10) Conversaciones
-- ---------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  channel_id uuid not null references public.channels(id) on delete restrict,
  customer_id uuid not null references public.customers(id) on delete restrict,

  status text not null default 'bot'
    check (status in ('bot', 'human', 'closed')),
  assigned_agent_id uuid references public.human_agents(id) on delete set null,

  customer_last_message text,
  customer_last_message_at timestamptz,
  ai_last_message_at timestamptz,
  last_message_at timestamptz not null default now(),

  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_conversations_business_id
  on public.conversations(business_id);

create index if not exists idx_conversations_channel_id
  on public.conversations(channel_id);

create index if not exists idx_conversations_customer_id
  on public.conversations(customer_id);

create index if not exists idx_conversations_status
  on public.conversations(status);

create index if not exists idx_conversations_last_message_at
  on public.conversations(last_message_at desc);

create index if not exists idx_conversations_business_last_message_at
  on public.conversations(business_id, last_message_at desc);

create trigger trg_conversations_updated_at
before update on public.conversations
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 11) Mensajes
-- ---------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,

  sender_type text not null
    check (sender_type in ('customer', 'ai', 'human', 'system')),

  sender_id uuid null,
  content text,
  message_type text not null default 'text'
    check (message_type in ('text', 'audio', 'image', 'file', 'system')),

  external_message_id text,
  tokens_used integer not null default 0
    check (tokens_used >= 0),

  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation_id
  on public.messages(conversation_id);

create index if not exists idx_messages_created_at
  on public.messages(created_at desc);

create index if not exists idx_messages_conversation_created_at
  on public.messages(conversation_id, created_at asc);

create index if not exists idx_messages_external_message_id
  on public.messages(external_message_id);

-- Evita duplicados cuando el proveedor devuelve un message id externo
create unique index if not exists uq_messages_external_message_id_not_null
  on public.messages(external_message_id)
  where external_message_id is not null;

-- ---------------------------------------------------------
-- 12) Métricas mensuales de uso
-- ---------------------------------------------------------
create table if not exists public.usage_metrics (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  period_month date not null,
  messages_count integer not null default 0 check (messages_count >= 0),
  inbound_count integer not null default 0 check (inbound_count >= 0),
  outbound_count integer not null default 0 check (outbound_count >= 0),
  ai_messages_count integer not null default 0 check (ai_messages_count >= 0),
  human_messages_count integer not null default 0 check (human_messages_count >= 0),
  tokens_used bigint not null default 0 check (tokens_used >= 0),
  estimated_cost numeric(12,4) not null default 0 check (estimated_cost >= 0),
  updated_at timestamptz not null default now(),

  constraint uq_usage_metrics_business_month unique (business_id, period_month)
);

create index if not exists idx_usage_metrics_business_id
  on public.usage_metrics(business_id);

create index if not exists idx_usage_metrics_period_month
  on public.usage_metrics(period_month desc);

create trigger trg_usage_metrics_updated_at
before update on public.usage_metrics
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------
-- 13) Vista útil para dashboard (opcional)
-- ---------------------------------------------------------
create or replace view public.v_conversation_list as
select
  c.id as conversation_id,
  c.business_id,
  b.name as business_name,
  c.channel_id,
  ch.channel_type,
  ch.display_name as channel_display_name,
  c.customer_id,
  cu.name as customer_name,
  c.status,
  c.customer_last_message,
  c.customer_last_message_at,
  c.ai_last_message_at,
  c.last_message_at,
  c.assigned_agent_id,
  ha.full_name as assigned_agent_name,
  c.created_at,
  c.updated_at
from public.conversations c
join public.businesses b on b.id = c.business_id
join public.channels ch on ch.id = c.channel_id
join public.customers cu on cu.id = c.customer_id
left join public.human_agents ha on ha.id = c.assigned_agent_id;

-- ---------------------------------------------------------
-- 14) Función helper para actualizar usage_metrics
--     La puedes usar luego desde n8n o desde SQL RPC si quieres
-- ---------------------------------------------------------
create or replace function public.increment_usage_metrics(
  p_business_id uuid,
  p_period_month date,
  p_messages_count integer default 0,
  p_inbound_count integer default 0,
  p_outbound_count integer default 0,
  p_ai_messages_count integer default 0,
  p_human_messages_count integer default 0,
  p_tokens_used bigint default 0,
  p_estimated_cost numeric default 0
)
returns void
language plpgsql
as $$
begin
  insert into public.usage_metrics (
    business_id,
    period_month,
    messages_count,
    inbound_count,
    outbound_count,
    ai_messages_count,
    human_messages_count,
    tokens_used,
    estimated_cost
  )
  values (
    p_business_id,
    p_period_month,
    p_messages_count,
    p_inbound_count,
    p_outbound_count,
    p_ai_messages_count,
    p_human_messages_count,
    p_tokens_used,
    p_estimated_cost
  )
  on conflict (business_id, period_month)
  do update set
    messages_count = public.usage_metrics.messages_count + excluded.messages_count,
    inbound_count = public.usage_metrics.inbound_count + excluded.inbound_count,
    outbound_count = public.usage_metrics.outbound_count + excluded.outbound_count,
    ai_messages_count = public.usage_metrics.ai_messages_count + excluded.ai_messages_count,
    human_messages_count = public.usage_metrics.human_messages_count + excluded.human_messages_count,
    tokens_used = public.usage_metrics.tokens_used + excluded.tokens_used,
    estimated_cost = public.usage_metrics.estimated_cost + excluded.estimated_cost,
    updated_at = now();
end;
$$;

-- ---------------------------------------------------------
-- 15) Seed mínimo opcional para pruebas
--     Puedes comentar esta parte si prefieres insertar luego manualmente
-- ---------------------------------------------------------

-- Negocio piloto
insert into public.businesses (
  name,
  sector,
  owner_email,
  status,
  plan,
  monthly_message_limit,
  system_prompt
)
values (
  'Negocio Piloto',
  'general',
  'piloto@example.com',
  'active',
  'starter',
  1000,
  'Eres un recepcionista virtual útil, amable y profesional. Responde con claridad y no inventes información.'
)
on conflict do nothing;

-- Configuración inicial del negocio piloto
insert into public.business_settings (
  business_id,
  welcome_message,
  fallback_message,
  language,
  timezone,
  ai_model,
  temperature
)
select
  b.id,
  'Hola, soy el asistente virtual del negocio. ¿En qué puedo ayudarte?',
  'Ahora mismo no tengo esa información exacta. Si quieres, te tomo los datos y te contactan.',
  'es',
  'Europe/Madrid',
  'gpt-4.1-mini',
  0.30
from public.businesses b
where b.name = 'Negocio Piloto'
on conflict (business_id) do nothing;

-- Canal WhatsApp de ejemplo
insert into public.channels (
  business_id,
  channel_type,
  external_id,
  display_name,
  status,
  metadata
)
select
  b.id,
  'whatsapp',
  'REPLACE_WITH_PHONE_NUMBER_ID',
  'WhatsApp principal',
  'pending',
  jsonb_build_object(
    'phone_number', '+34000000000',
    'provider', 'meta_cloud_api'
  )
from public.businesses b
where b.name = 'Negocio Piloto'
on conflict (business_id, channel_type, external_id) do nothing;

-- FAQs de ejemplo
insert into public.knowledge_base (
  business_id,
  question,
  answer,
  category,
  is_active,
  sort_order
)
select
  b.id,
  q.question,
  q.answer,
  q.category,
  true,
  q.sort_order
from public.businesses b
cross join (
  values
    ('¿Cuál es vuestro horario?', 'Nuestro horario es de lunes a viernes de 9:00 a 20:00.', 'horarios', 1),
    ('¿Dónde estáis?', 'Estamos en Madrid. Si quieres, te envío la ubicación exacta.', 'ubicacion', 2),
    ('¿Qué servicios ofrecéis?', 'Ofrecemos nuestros servicios principales según disponibilidad del negocio. Dime qué necesitas y te orientamos.', 'servicios', 3)
) as q(question, answer, category, sort_order)
where b.name = 'Negocio Piloto';