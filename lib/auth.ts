import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "daggle-dev-secret-change-me"
);

const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export async function signAccessToken(userId: string) {
  return new SignJWT({ sub: userId, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXP)
    .sign(SECRET);
}

export async function signRefreshToken(userId: string) {
  return new SignJWT({ sub: userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXP)
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { sub: string; type: "access" | "refresh" };
  } catch {
    return null;
  }
}

export async function getAuthUser(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice(7);
  const payload = await verifyToken(token);
  if (!payload || payload.type !== "access") return null;
  return { userId: payload.sub };
}
