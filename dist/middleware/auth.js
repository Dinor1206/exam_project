import { verifyAccess } from "../utils/jwt.js";
export function auth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token)
        return res.status(401).json({ message: "unauthorized" });
    try {
        const payload = verifyAccess(token);
        req.userId = payload.id;
        next();
    }
    catch {
        res.status(401).json({ message: "unauthorized" });
    }
}
//# sourceMappingURL=auth.js.map