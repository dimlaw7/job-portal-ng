import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);

export async function createSession(admin) {
  return new SignJWT({
    adminId: admin.id,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch {
    return null;
  }
}
