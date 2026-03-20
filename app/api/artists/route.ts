import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS artists (
    id VARCHAR(100) PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    bio TEXT,
    location VARCHAR(255),
    tags VARCHAR(255),
    avatar_url TEXT,
    followers_label VARCHAR(100),
    works_count_label VARCHAR(100),
    subscribers_label VARCHAR(100),
    socials JSONB,
    exhibitions JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function GET(request: Request) {
  try {
    await ensureTable();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const rows = await sql`
        SELECT id, display_name, bio, location, tags, avatar_url, followers_label, works_count_label, subscribers_label, socials, exhibitions
        FROM artists WHERE id = ${id}
      `;
      if (rows.length === 0) return NextResponse.json({ error: "작가를 찾을 수 없습니다." }, { status: 404 });
      return NextResponse.json(rows[0]);
    }

    const rows = await sql`
      SELECT id, display_name, bio, location, tags, avatar_url, followers_label, works_count_label, subscribers_label, socials, exhibitions
      FROM artists ORDER BY created_at DESC LIMIT 50
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "작가 정보를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const {
      id,
      displayName,
      bio,
      location,
      tags,
      avatarUrl,
      followersLabel,
      worksCountLabel,
      subscribersLabel,
      socials,
      exhibitions,
    } = body;

    if (!id || !displayName) {
      return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO artists (id, display_name, bio, location, tags, avatar_url, followers_label, works_count_label, subscribers_label, socials, exhibitions)
      VALUES (${id}, ${displayName}, ${bio ?? null}, ${location ?? null}, ${tags ?? null}, ${avatarUrl ?? null}, ${followersLabel ?? null}, ${worksCountLabel ?? null}, ${subscribersLabel ?? null}, ${socials ? JSON.stringify(socials) : null}, ${exhibitions ? JSON.stringify(exhibitions) : null})
      ON CONFLICT (id) DO UPDATE
      SET display_name = EXCLUDED.display_name,
          bio = EXCLUDED.bio,
          location = EXCLUDED.location,
          tags = EXCLUDED.tags,
          avatar_url = EXCLUDED.avatar_url,
          followers_label = EXCLUDED.followers_label,
          works_count_label = EXCLUDED.works_count_label,
          subscribers_label = EXCLUDED.subscribers_label,
          socials = EXCLUDED.socials,
          exhibitions = EXCLUDED.exhibitions
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "작가 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
