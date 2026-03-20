import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: "로그인이 필요해요." },
        { status: 401 }
      );
    }

    const rows = await sql`
      SELECT id, email, name, created_at
      FROM users WHERE id = ${Number(auth.userId)}
    `;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없어요." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "정보를 불러오는 중 문제가 발생했어요." },
      { status: 500 }
    );
  }
}
