import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(100) PRIMARY KEY,
    artist_name VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`SELECT id, artist_name, message FROM subscriptions ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "구독 요약을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const { id, artistName, message } = await request.json();
    if (!id || !artistName) return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    const rows = await sql`
      INSERT INTO subscriptions (id, artist_name, message)
      VALUES (${id}, ${artistName}, ${message ?? null})
      ON CONFLICT (id) DO UPDATE SET artist_name = EXCLUDED.artist_name, message = EXCLUDED.message
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "구독 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
