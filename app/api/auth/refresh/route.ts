import { NextResponse } from "next/server";
import {
  verifyToken,
  signAccessToken,
  signRefreshToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "리프레시 토큰이 필요해요." },
        { status: 400 }
      );
    }

    const payload = await verifyToken(refreshToken);
    if (!payload || payload.type !== "refresh") {
      return NextResponse.json(
        { error: "유효하지 않은 리프레시 토큰이에요." },
        { status: 401 }
      );
    }

    const newAccessToken = await signAccessToken(payload.sub);
    const newRefreshToken = await signRefreshToken(payload.sub);

    return NextResponse.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "토큰 갱신 중 문제가 발생했어요." },
      { status: 500 }
    );
  }
}
