import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const DEFAULT_ITERATIONS = 100_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

/**
 * 저장 포맷: pbkdf2$<iterations>$<saltHex>$<hashHex>
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = pbkdf2Sync(password, salt, DEFAULT_ITERATIONS, KEY_LENGTH, DIGEST);
  const hashHex = derived.toString("hex");
  return `pbkdf2$${DEFAULT_ITERATIONS}$${salt}$${hashHex}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 4) return false;

  const [scheme, iterationsRaw, saltHex, hashHex] = parts;
  if (scheme !== "pbkdf2") return false;

  const iterations = Number(iterationsRaw);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  try {
    const derived = pbkdf2Sync(password, saltHex, iterations, KEY_LENGTH, DIGEST);
    const storedBuf = Buffer.from(hashHex, "hex");

    // 길이가 다르면 timingSafeEqual이 throw 하므로 사전 체크
    if (storedBuf.length !== derived.length) return false;

    return timingSafeEqual(storedBuf, derived);
  } catch {
    return false;
  }
}
