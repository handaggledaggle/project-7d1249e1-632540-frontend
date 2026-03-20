import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY,
    created_at_label VARCHAR(255),
    payment_label VARCHAR(255),
    status_label VARCHAR(100),
    artwork_title VARCHAR(255),
    artwork_option_label VARCHAR(255),
    price_label VARCHAR(100),
    thumb_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function GET(request: Request) {
  try {
    await ensureTable();
    const rows = await sql`SELECT id, created_at_label, payment_label, status_label, artwork_title, artwork_option_label, price_label, thumb_url FROM orders ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "주문 목록을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { id, createdAtLabel, paymentLabel, statusLabel, artworkTitle, artworkOptionLabel, priceLabel, thumbUrl } = body;
    if (!id || !createdAtLabel) return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });

    const rows = await sql`
      INSERT INTO orders (id, created_at_label, payment_label, status_label, artwork_title, artwork_option_label, price_label, thumb_url)
      VALUES (${id}, ${createdAtLabel}, ${paymentLabel ?? null}, ${statusLabel ?? null}, ${artworkTitle ?? null}, ${artworkOptionLabel ?? null}, ${priceLabel ?? null}, ${thumbUrl ?? null})
      ON CONFLICT (id) DO UPDATE
      SET created_at_label = EXCLUDED.created_at_label,
          payment_label = EXCLUDED.payment_label,
          status_label = EXCLUDED.status_label,
          artwork_title = EXCLUDED.artwork_title,
          artwork_option_label = EXCLUDED.artwork_option_label,
          price_label = EXCLUDED.price_label,
          thumb_url = EXCLUDED.thumb_url
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "주문 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
