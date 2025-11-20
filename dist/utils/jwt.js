import jwt from "jsonwebtoken";
const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";
export function signAccess(payload) {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}
export function signRefresh(payload) {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}
export function verifyAccess(token) {
    return jwt.verify(token, process.env.ACCESS_SECRET);
}
export function verifyRefresh(token) {
    return jwt.verify(token, process.env.REFRESH_SECRET);
}
//# sourceMappingURL=jwt.js.map