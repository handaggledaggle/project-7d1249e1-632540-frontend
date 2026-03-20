import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";

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
}

export async function POST(request: Request) {
  try {
    await ensureTable();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT id, email, name, password_hash, created_at
      FROM users WHERE email = ${email}
    `;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 맞지 않아요." },
        { status: 401 }
      );
    }

    const user = rows[0];
    const valid = verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 맞지 않아요." },
        { status: 401 }
      );
    }

    const accessToken = await signAccessToken(String(user.id));
    const refreshToken = await signRefreshToken(String(user.id));

    const { password_hash: _passwordHash, ...safeUser } = user;
    return NextResponse.json({ user: safeUser, accessToken, refreshToken });
  } catch {
    return NextResponse.json(
      { error: "로그인 중 문제가 발생했어요." },
      { status: 500 }
    );
  }
}
