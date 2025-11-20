import Category from "../model/category.model.js";
export async function createCategory(req, res) {
    const { name, description } = req.body;
    if (!name)
        return res.status(400).json({ message: "invalid" });
    const exists = await Category.findOne({ where: { name } });
    if (exists)
        return res.status(409).json({ message: "exists" });
    const cat = await Category.create({ name, description });
    res.status(201).json(cat);
}
export async function listCategories(_req, res) {
    const list = await Category.findAll();
    res.json(list);
}
export async function getCategory(req, res) {
    const cat = await Category.findByPk(req.params.id);
    if (!cat)
        return res.status(404).json({ message: "not found" });
    res.json(cat);
}
export async function updateCategory(req, res) {
    const cat = await Category.findByPk(req.params.id);
    if (!cat)
        return res.status(404).json({ message: "not found" });
    const { name, description } = req.body;
    await cat.update({ name, description });
    res.json(cat);
}
export async function deleteCategory(req, res) {
    const cat = await Category.findByPk(req.params.id);
    if (!cat)
        return res.status(404).json({ message: "not found" });
    await cat.destroy();
    res.json({ ok: true });
}
//# sourceMappingURL=category.controller.js.map