import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS artists (
      id SERIAL PRIMARY KEY,
      avatar_url VARCHAR(255),
      bio TEXT,
      display_name VARCHAR(255),
      exhibitions VARCHAR(255),
      followers_label VARCHAR(255),
      location VARCHAR(255),
      socials VARCHAR(255),
      subscribers_label VARCHAR(255),
      tags VARCHAR(255),
      works_count_label VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS artworks (
      id SERIAL PRIMARY KEY,
      artist_id INTEGER,
      artist_name VARCHAR(255),
      image_url VARCHAR(255),
      price_label VARCHAR(255),
      sale_status VARCHAR(255),
      title VARCHAR(255),
      type VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      artist VARCHAR(255),
      options VARCHAR(255),
      price_label VARCHAR(255),
      qty VARCHAR(255),
      subtitle VARCHAR(255),
      thumb_url VARCHAR(255),
      title VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      artwork_option_label VARCHAR(255),
      artwork_title VARCHAR(255),
      created_at_label VARCHAR(255),
      payment_label VARCHAR(255),
      price_label VARCHAR(255),
      status_label VARCHAR(255),
      thumb_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      artist_name VARCHAR(255),
      message VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      email VARCHAR(255) UNIQUE,
      name VARCHAR(255),
      password_hash VARCHAR(255)
    )`;
    return NextResponse.json({ success: true, message: 'Tables initialized' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
