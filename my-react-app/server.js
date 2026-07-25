import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

dotenv.config();
const { Pool } = pg;
const app = express();

// Render sets PORT automatically; fall back to 5001 for local dev
const port = process.env.PORT || 5001;

// CORS — allow your production site + local dev.
// Set ALLOWED_ORIGINS in Render as a comma-separated list,
// e.g. "https://elevatedhomeinterio.com,https://www.elevatedhomeinterio.com"
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((o) => o.trim());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

// Neon connection — DATABASE_URL comes from Neon's dashboard.
// Format: postgresql://USER:PASSWORD@HOST/DB?sslmode=require
if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL is not set. The API will fail on DB calls.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

// Health check — useful for Render + quick sanity from the browser
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  console.log('👉 Request Received:', req.body);

  try {
    const { name, email, interest, phone, message } = req.body;

    const query = `
      INSERT INTO user_inquiries
      (full_name, email_address, interested_in, phone_number, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, email, interest, phone, message];

    const newEntry = await pool.query(query, values);

    console.log('✅ Saved!');
    res.json(newEntry.rows[0]);
  } catch (err) {
    console.error('❌ CRITICAL ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
