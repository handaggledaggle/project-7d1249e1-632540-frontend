import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS artworks (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id VARCHAR(100) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    price_label VARCHAR(255),
    sale_status VARCHAR(50),
    type VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

function toArtworkCardDTO(row: any) {
  return {
    id: String(row.id),
    title: row.title,
    artistId: row.artist_id,
    artistName: row.artist_name,
    priceLabel: row.price_label ?? "",
    saleStatus: row.sale_status ?? undefined,
    type: row.type ?? undefined,
    imageUrl: row.image_url ?? "",
  };
}

export async function GET(request: Request) {
  try {
    await ensureTable();
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 20;

    const rows = await sql`
      SELECT id, title, artist_id, artist_name, price_label, sale_status, type, image_url
      FROM artworks
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return NextResponse.json(rows.map(toArtworkCardDTO));
  } catch {
    return NextResponse.json(
      { error: "작품을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const {
      id,
      title,
      artistId,
      artistName,
      priceLabel,
      saleStatus,
      type,
      imageUrl,
    } = body;

    if (!id || !title || !artistId || !artistName) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO artworks (id, title, artist_id, artist_name, price_label, sale_status, type, image_url)
      VALUES (
        ${id},
        ${title},
        ${artistId},
        ${artistName},
        ${priceLabel ?? null},
        ${saleStatus ?? null},
        ${type ?? null},
        ${imageUrl ?? null}
      )
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          artist_id = EXCLUDED.artist_id,
          artist_name = EXCLUDED.artist_name,
          price_label = EXCLUDED.price_label,
          sale_status = EXCLUDED.sale_status,
          type = EXCLUDED.type,
          image_url = EXCLUDED.image_url
      RETURNING id, title, artist_id, artist_name, price_label, sale_status, type, image_url
    `;

    return NextResponse.json(toArtworkCardDTO(rows[0]), { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "작품 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
