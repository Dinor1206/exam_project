import * as bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import User from "../model/user.model.js";
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt.js";

export async function register(req: Request, res: Response) {
  const { username, password, full_name } = req.body;
  if (!username || !password) return res.status(400).json({ message: "invalid" });
  const exists = await (User as any).findOne({ where: { username } });
  if (exists) return res.status(409).json({ message: "exists" });
  const password_hash = await bcrypt.hash(password, 10);
  const user: any = await (User as any).create({ username, password_hash, full_name, refresh_token: null });
  const access = signAccess({ id: user.get("id") });
  const refresh = signRefresh({ id: user.get("id") });
  await user.update({ refresh_token: refresh });
  res.json({ access, refresh });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user: any = await (User as any).findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: "invalid" });
  const ok = await bcrypt.compare(password, user.get("password_hash") as string);
  if (!ok) return res.status(401).json({ message: "invalid" });
  const access = signAccess({ id: user.get("id") });
  const refresh = signRefresh({ id: user.get("id") });
  await user.update({ refresh_token: refresh });
  res.json({ access, refresh });
}

export async function refreshToken(req: Request, res: Response) {
  const { refresh } = req.body;
  if (!refresh) return res.status(400).json({ message: "invalid" });
  try {
    const payload: any = verifyRefresh(refresh);
    const user: any = await (User as any).findByPk(payload.id);
    if (!user || user.get("refresh_token") !== refresh) return res.status(401).json({ message: "unauthorized" });
    const access = signAccess({ id: payload.id });
    const newRefresh = signRefresh({ id: payload.id });
    await user.update({ refresh_token: newRefresh });
    res.json({ access, refresh: newRefresh });
  } catch {
    res.status(401).json({ message: "unauthorized" });
  }
}

export async function logout(req: Request, res: Response) {
  const user: any = await (User as any).findByPk((req as any).userId);
  if (user) await user.update({ refresh_token: null });
  res.json({ ok: true });
}

export async function changePassword(req: Request, res: Response) {
  const { old_password, new_password } = req.body;
  const user: any = await (User as any).findByPk((req as any).userId);
  if (!user) return res.status(404).json({ message: "not found" });
  const ok = await bcrypt.compare(old_password, user.get("password_hash") as string);
  if (!ok) return res.status(400).json({ message: "invalid" });
  const password_hash = await bcrypt.hash(new_password, 10);
  await user.update({ password_hash });
  res.json({ ok: true });
}

export async function forgotPassword(req: Request, res: Response) {
  res.json({ ok: true });
}
