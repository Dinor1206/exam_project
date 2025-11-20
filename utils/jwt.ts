import jwt from "jsonwebtoken";

const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";

export function signAccess(payload: object) {
  return jwt.sign(payload, process.env.ACCESS_SECRET as string, { expiresIn: ACCESS_TTL });
}

export function signRefresh(payload: object) {
  return jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: REFRESH_TTL });
}

export function verifyAccess(token: string) {
  return jwt.verify(token, process.env.ACCESS_SECRET as string) as any;
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, process.env.REFRESH_SECRET as string) as any;
}
