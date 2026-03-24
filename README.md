# 🤖 AI Receptionist SaaS

Micro-SaaS that automatically answers customer messages on **WhatsApp** using **AI** and provides a **dashboard to manage conversations, clients and knowledge base**.

The goal of the project is to build a **virtual AI receptionist for small businesses** that can respond instantly to customer inquiries.

---

# 🚀 Features

- 💬 Automated AI replies to customer messages
- 📱 WhatsApp Cloud API integration
- 🧠 Knowledge base for contextual answers
- 🗂 Customer conversation management
- 📊 Usage metrics per business
- 🧑‍💻 Dashboard to monitor conversations
- 🏢 Multi-business architecture

---

# 🧱 Architecture
# 🤖 AI Receptionist SaaS

Micro-SaaS that automatically answers customer messages on **WhatsApp** using **AI** and provides a **dashboard to manage conversations, clients and knowledge base**.

The goal of the project is to build a **virtual AI receptionist for small businesses** that can respond instantly to customer inquiries.

---

# 🚀 Features

- 💬 Automated AI replies to customer messages
- 📱 WhatsApp Cloud API integration
- 🧠 Knowledge base for contextual answers
- 🗂 Customer conversation management
- 📊 Usage metrics per business
- 🧑‍💻 Dashboard to monitor conversations
- 🏢 Multi-business architecture

---

# 🧱 Architecture
Client
↓
WhatsApp
↓
Webhook
↓
n8n Workflow
↓
Supabase Database
↓
OpenAI
↓
AI Response
↓
Customer


---

# 🗄 Database

The system uses **Supabase (PostgreSQL)**.

Main tables:

- businesses
- channels
- customers
- contact_points
- conversations
- messages
- knowledge_base
- usage_metrics
- business_settings
- human_agents

The architecture is designed to support:

- multi-business SaaS
- multi-channel communication
- AI + human agent handoff

---

# 🖥 Dashboard

The dashboard allows businesses to:

- view active conversations
- read customer messages
- manage clients
- edit knowledge base
- configure AI responses

Main UI sections:

Sidebar
Conversations
Chat window
Clients
Knowledge base
Settings


---

# ⚙️ Tech Stack

Frontend
- HTML
- CSS
- JavaScript

Backend / Infra

- Supabase (PostgreSQL)
- OpenAI API
- n8n
- WhatsApp Cloud API

Deployment

- VPS (Ubuntu)
- Nginx

---

# 📂 Project Structure

ai-receptionist

backend
dashboard
frontend
landing
auth
database
schema.sql
workflows
docs


---

# 🔑 MVP Goal

The first version focuses on:

- 1 business
- 1 WhatsApp number
- AI answering messages
- simple dashboard to view conversations

---

# 🧪 Future Improvements

- Instagram integration
- Voice AI
- Human agent takeover
- Real-time dashboard updates
- Stripe billing
- Multi-tenant SaaS platform

---

# 👨‍💻 Author

David Álvarez Iglesias

Full Stack Developer  
Madrid, Spain
