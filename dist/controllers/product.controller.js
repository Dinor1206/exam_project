import { Op } from "sequelize";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";
export async function createProduct(req, res) {
    const { name, price, stock, categoryId, images = [], details = {} } = req.body;
    if (!name || price == null || categoryId == null)
        return res.status(400).json({ message: "invalid" });
    const prod = await Product.create({ name, price, stock: stock ?? 0, categoryId, images, details });
    res.status(201).json(prod);
}
export async function listProducts(req, res) {
    const { q, categoryId, limit = 20, offset = 0 } = req.query;
    const where = {};
    if (q)
        where.name = { [Op.iLike]: `%${q}%` };
    if (categoryId)
        where.categoryId = Number(categoryId);
    const list = await Product.findAll({ where, limit: Number(limit), offset: Number(offset), include: [Category] });
    res.json(list);
}
export async function bestSelling(_req, res) {
    const list = await Product.findAll({ order: [["sold_count", "DESC"]], limit: 10 });
    res.json(list);
}
export async function getProduct(req, res) {
    const item = await Product.findByPk(req.params.id, { include: [Category] });
    if (!item)
        return res.status(404).json({ message: "not found" });
    res.json(item);
}
export async function updateProduct(req, res) {
    const item = await Product.findByPk(req.params.id);
    if (!item)
        return res.status(404).json({ message: "not found" });
    const { name, price, stock, categoryId, images, details } = req.body;
    await item.update({ name, price, stock, categoryId, images, details });
    res.json(item);
}
export async function deleteProduct(req, res) {
    const item = await Product.findByPk(req.params.id);
    if (!item)
        return res.status(404).json({ message: "not found" });
    await item.destroy();
    res.json({ ok: true });
}
//# sourceMappingURL=product.controller.js.map