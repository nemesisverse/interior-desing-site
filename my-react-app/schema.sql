-- Run this once in Neon → SQL Editor to create the table your API writes to.

CREATE TABLE IF NOT EXISTS user_inquiries (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  email_address TEXT        NOT NULL,
  interested_in TEXT,
  phone_number  TEXT,
  message       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_inquiries_created_at_idx
  ON user_inquiries (created_at DESC);
