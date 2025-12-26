import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

// 1. Setup
dotenv.config();
const { Pool } = pg;
const app = express();
const port = 5001;

// 2. MANUAL CORS FIX (No library needed)
// This forces the browser to allow connections from anywhere
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow ANY frontend
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // If browser asks "Can I connect?", say "YES" immediately
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

// 3. Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'Elelvated-Home-Intero', // Keeping your typo "Elelvated" just in case
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});

// 4. API Route
app.post('/api/contact', async (req, res) => {
  console.log("👉 Request Received:", req.body); // If you don't see this, the request isn't reaching the code logic

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
    
    console.log("✅ Saved!");
    res.json(newEntry.rows[0]);

  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err.message);
    // If we crash, we STILL need to send JSON or the browser thinks it's a CORS error
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});