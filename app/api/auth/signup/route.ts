import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

export const runtime = "nodejs";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function POST(request: Request) {
  try {
    await ensureTable();

    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일이에요." },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const rows = await sql`
      INSERT INTO users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name ?? null})
      RETURNING id, email, name, created_at
    `;
    const user = rows[0];

    const accessToken = await signAccessToken(String(user.id));
    const refreshToken = await signRefreshToken(String(user.id));

    return NextResponse.json(
      { user, accessToken, refreshToken },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "회원가입 중 문제가 발생했어요." },
      { status: 500 }
    );
  }
}
