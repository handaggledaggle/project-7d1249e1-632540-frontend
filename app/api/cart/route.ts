import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS cart_items (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255),
    artist VARCHAR(255),
    subtitle VARCHAR(255),
    price_label VARCHAR(100),
    options JSONB,
    qty INTEGER,
    thumb_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`SELECT id, title, artist, subtitle, price_label, options, qty, thumb_url FROM cart_items ORDER BY created_at`;
    // map options JSONB to array if needed
    const mapped = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      artist: r.artist,
      subtitle: r.subtitle,
      priceLabel: r.price_label,
      options: r.options ?? [],
      qty: r.qty,
      thumbUrl: r.thumb_url,
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: "장바구니를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const { id, title, artist, subtitle, priceLabel, options, qty, thumbUrl } = await request.json();
    if (!id) return NextResponse.json({ error: "id 필요" }, { status: 400 });
    const rows = await sql`
      INSERT INTO cart_items (id, title, artist, subtitle, price_label, options, qty, thumb_url)
      VALUES (${id}, ${title ?? null}, ${artist ?? null}, ${subtitle ?? null}, ${priceLabel ?? null}, ${options ? JSON.stringify(options) : null}, ${qty ?? 1}, ${thumbUrl ?? null})
      ON CONFLICT (id) DO UPDATE SET qty = EXCLUDED.qty
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "장바구니 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
