import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "session";
const SECRET = process.env.SESSION_SECRET!; // set in .env

type SessionData = { userId: string; iat: number };

function base64url(input: Buffer | string) {
    return Buffer.from(input).toString("base64url");
}

function sign(payloadB64: string) {
    return crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");
}

export async function setSession(userId: string) {
    const data: SessionData = { userId, iat: Date.now() };
    const payloadB64 = base64url(JSON.stringify(data));
    const sig = sign(payloadB64);
    const value = `${payloadB64}.${sig}`;

    (await cookies()).set(COOKIE_NAME, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function clearSession() {
    (await cookies()).set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getSession(): Promise<SessionData | null> {
    const value = (await cookies()).get(COOKIE_NAME)?.value;
    if (!value) return null;

    const [payloadB64, sig] = value.split(".");
    if (!payloadB64 || !sig) return null;

    const expected = sign(payloadB64);

    const ok =
        expected.length === sig.length &&
        crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));

    if (!ok) return null;

    try {
        return JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as SessionData;
    } catch {
        return null;
    }
}
