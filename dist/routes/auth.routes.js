import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, refreshToken, logout, changePassword, forgotPassword } from "../controllers/auth.controller.js";
const r = Router();
r.post("/register", register);
r.post("/login", login);
r.post("/refresh", refreshToken);
r.post("/logout", auth, logout);
r.post("/change-password", auth, changePassword);
r.post("/forgot-password", forgotPassword);
export default r;
//# sourceMappingURL=auth.routes.js.map