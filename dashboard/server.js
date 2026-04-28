/**
 * itopy.ai Dashboard — Backend API
 * Express server que actúa como proxy seguro para todas las integraciones
 * Deploy: sudo systemctl start itopy-dashboard
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const http = require('http');
const net = require('net');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3050;
const SECRET = process.env.DASHBOARD_SECRET || 'changeme';

app.use(cors());
app.use(express.json());

// ─── Auth middleware ──────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers['x-dashboard-token'] || req.query.token;
  if (token !== SECRET) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function notionFetch(endpoint, method = 'GET', body = null) {
  const token = process.env.NOTION_TOKEN;
  const url = `https://api.notion.com/v1${endpoint}`;
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

async function dockerRequest(path) {
  return new Promise((resolve, reject) => {
    const socketPath = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
    const req = http.request({ socketPath, path, method: 'GET' }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve([]); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── API: VPS Status ──────────────────────────────────────────────────────────
app.get('/api/vps', auth, async (req, res) => {
  try {
    const containers = await dockerRequest('/containers/json?all=true');
    const result = containers.map(c => ({
      name: c.Names[0]?.replace('/', '') || 'unknown',
      status: c.State,
      statusText: c.Status,
      running: c.State === 'running',
      image: c.Image,
      ports: c.Ports?.map(p => p.PublicPort).filter(Boolean) || [],
    }));
    res.json({ ok: true, containers: result, ts: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Notion Tasks ────────────────────────────────────────────────────────
app.get('/api/notion/tasks', auth, async (req, res) => {
  try {
    const data = await notionFetch(`/databases/${process.env.NOTION_TASKS_DB}/query`, 'POST', {
      filter: { property: 'Estado', status: { does_not_equal: 'Hecha' } },
      sorts: [{ property: 'Prioridad', direction: 'descending' }],
      page_size: 20,
    });
    const tasks = data.results.map(p => ({
      id: p.id,
      title: p.properties?.Nombre?.title?.[0]?.plain_text || '(sin título)',
      status: p.properties?.Estado?.status?.name || '—',
      priority: p.properties?.Prioridad?.select?.name || '—',
      project: p.properties?.Proyecto?.relation?.[0]?.id || null,
      url: p.url,
    }));
    res.json({ ok: true, tasks });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Notion Projects ─────────────────────────────────────────────────────
app.get('/api/notion/projects', auth, async (req, res) => {
  try {
    const data = await notionFetch(`/databases/${process.env.NOTION_PROJECTS_DB}/query`, 'POST', {
      filter: {
        or: [
          { property: 'Estado', status: { equals: 'Activo' } },
          { property: 'Estado', status: { equals: 'En construcción' } },
        ]
      },
      page_size: 20,
    });
    const projects = data.results.map(p => ({
      id: p.id,
      title: p.properties?.Nombre?.title?.[0]?.plain_text || '(sin título)',
      status: p.properties?.Estado?.status?.name || '—',
      url: p.url,
    }));
    res.json({ ok: true, projects });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Google Calendar ─────────────────────────────────────────────────────
app.get('/api/calendar', auth, async (req, res) => {
  try {
    const credPath = process.env.GOOGLE_CREDENTIALS_PATH;
    if (!credPath || !fs.existsSync(credPath)) {
      return res.json({ ok: true, events: [], note: 'No credentials configured' });
    }
    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
      keyFile: credPath,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
    const calendar = google.calendar({ version: 'v3', auth });
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const r = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: now.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 10,
    });
    const events = (r.data.items || []).map(e => ({
      id: e.id,
      summary: e.summary,
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      location: e.location || null,
    }));
    res.json({ ok: true, events });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Gmail Search (via n8n) ──────────────────────────────────────────────
app.post('/api/email', auth, async (req, res) => {
  try {
    const { query = 'is:unread' } = req.body;
    const r = await fetch(process.env.N8N_GMAIL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!r.ok) throw new Error(`n8n error: ${r.status}`);
    const data = await r.json();
    const messages = Array.isArray(data) ? data : data.messages || [];
    res.json({ ok: true, messages: messages.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: n8n Workflows ───────────────────────────────────────────────────────
app.get('/api/n8n/workflows', auth, async (req, res) => {
  try {
    const base = process.env.N8N_BASE_URL || 'https://n8n.itopy.ai';
    const apiKey = process.env.N8N_API_KEY;
    if (!apiKey) return res.json({ ok: true, workflows: [], note: 'No N8N_API_KEY configured' });
    const r = await fetch(`${base}/api/v1/workflows`, {
      headers: { 'X-N8N-API-KEY': apiKey }
    });
    if (!r.ok) throw new Error(`n8n ${r.status}`);
    const data = await r.json();
    const workflows = (data.data || []).map(w => ({
      id: w.id,
      name: w.name,
      active: w.active,
    }));
    res.json({ ok: true, workflows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Create Task ─────────────────────────────────────────────────────────
app.post('/api/notion/tasks', auth, async (req, res) => {
  try {
    const { title, priority = 'Media' } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });
    const prioMap = { 'Alta': 'Alta', 'Media': 'Media', 'Baja': 'Baja' };
    const page = await notionFetch('/pages', 'POST', {
      parent: { database_id: process.env.NOTION_TASKS_DB },
      properties: {
        Nombre: { title: [{ text: { content: title } }] },
        Prioridad: { select: { name: prioMap[priority] || 'Media' } },
      }
    });
    res.json({ ok: true, id: page.id, url: page.url });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Create Calendar Event ───────────────────────────────────────────────
app.post('/api/calendar/events', auth, async (req, res) => {
  try {
    const { title, start, end, description } = req.body;
    if (!title || !start) return res.status(400).json({ error: 'title and start required' });
    const credPath = process.env.GOOGLE_CREDENTIALS_PATH;
    const { google } = require('googleapis');
    const gauth = new google.auth.GoogleAuth({
      keyFile: credPath,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    const calendar = google.calendar({ version: 'v3', auth: gauth });
    const endTime = end || new Date(new Date(start).getTime() + 60 * 60000).toISOString();
    const r = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: {
        summary: title,
        description: description || '',
        start: { dateTime: start, timeZone: 'Europe/Madrid' },
        end: { dateTime: endTime, timeZone: 'Europe/Madrid' },
      },
    });
    res.json({ ok: true, id: r.data.id, link: r.data.htmlLink });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── API: Deploy trigger ──────────────────────────────────────────────────────
const { exec } = require('child_process');
const SCRIPTS_DIR = process.env.DEPLOY_SCRIPTS_DIR || '/opt/itopy.ai/scripts/deploy';

const ALLOWED_PROJECTS = ['antigravity', 'vaperia', 'dashboard'];

app.post('/api/deploy/:project', auth, (req, res) => {
  const { project } = req.params;
  if (!ALLOWED_PROJECTS.includes(project)) {
    return res.status(404).json({ error: `Unknown project: ${project}` });
  }
  const scriptPath = `${SCRIPTS_DIR}/deploy-${project}.sh`;
  const triggeredBy = req.headers['x-triggered-by'] || 'api';
  console.log(`[deploy] ${project} triggered by ${triggeredBy}`);

  // Responde inmediatamente y ejecuta en background
  res.json({ ok: true, project, status: 'deploying', triggeredBy });

  exec(`bash ${scriptPath}`, { timeout: 120000 }, (err, stdout, stderr) => {
    if (err) {
      console.error(`[deploy] ${project} FAILED:`, stderr);
    } else {
      console.log(`[deploy] ${project} OK:`, stdout.trim());
    }
  });
});

// ─── Serve static PWA ─────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, '127.0.0.1', () => {
  console.log(`itopy Dashboard API running on port ${PORT}`);
});
