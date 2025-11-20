import type { Request, Response } from "express";
import { Op } from "sequelize";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";

export async function createProduct(req: Request, res: Response) {
  const { name, price, stock, categoryId, images = [], details = {} } = req.body;
  if (!name || price == null || categoryId == null) return res.status(400).json({ message: "invalid" });
  const prod = await (Product as any).create({ name, price, stock: stock ?? 0, categoryId, images, details });
  res.status(201).json(prod);
}

export async function listProducts(req: Request, res: Response) {
  const { q, categoryId, limit = 20, offset = 0 } = req.query as any;
  const where: any = {};
  if (q) where.name = { [Op.iLike]: `%${q}%` } as any;
  if (categoryId) where.categoryId = Number(categoryId);
  const list = await Product.findAll({ where, limit: Number(limit), offset: Number(offset), include: [Category] });
  res.json(list);
}

export async function bestSelling(_req: Request, res: Response) {
  const list = await Product.findAll({ order: [["sold_count", "DESC"]], limit: 10 });
  res.json(list);
}

export async function getProduct(req: Request, res: Response) {
  const item = await Product.findByPk(req.params.id, { include: [Category] });
  if (!item) return res.status(404).json({ message: "not found" });
  res.json(item);
}

export async function updateProduct(req: Request, res: Response) {
  const item: any = await (Product as any).findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "not found" });
  const { name, price, stock, categoryId, images, details } = req.body;
  await item.update({ name, price, stock, categoryId, images, details });
  res.json(item);
}

export async function deleteProduct(req: Request, res: Response) {
  const item: any = await Product.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "not found" });
  await item.destroy();
  res.json({ ok: true });
}
