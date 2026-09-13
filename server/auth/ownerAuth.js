import argon2 from "argon2";
import jwt from "jsonwebtoken";

const FALLBACK_EMAIL = "owner@nouribymorgan.com";

export function getOwnerEmail() {
  return process.env.OWNER_EMAIL || FALLBACK_EMAIL;
}

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

export async function authenticateOwner({ email, password }) {
  const ownerEmail = getOwnerEmail();
  const passwordHash = process.env.OWNER_PASSWORD_HASH;

  if (!passwordHash) {
    const error = new Error("OWNER_PASSWORD_HASH is not configured on the server.");
    error.status = 503;
    throw error;
  }

  const normalizedEmail = email?.trim().toLowerCase();
  const emailMatches = normalizedEmail === ownerEmail.toLowerCase();

  if (!emailMatches) {
    return null;
  }

  const passwordMatches = await argon2.verify(passwordHash, password || "");

  if (!passwordMatches) {
    return null;
  }

  return {
    email: ownerEmail,
    role: "owner",
  };
}

export function signOwnerToken(owner) {
  return jwt.sign(owner, getJwtSecret(), {
    expiresIn: "12h",
  });
}

export function verifyOwnerToken(token) {
  return jwt.verify(token, getJwtSecret());
}
