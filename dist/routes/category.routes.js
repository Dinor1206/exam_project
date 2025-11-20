import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createCategory, listCategories, getCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
const r = Router();
r.get("/", listCategories);
r.get("/:id", getCategory);
r.post("/", auth, createCategory);
r.put("/:id", auth, updateCategory);
r.delete("/:id", auth, deleteCategory);
export default r;
//# sourceMappingURL=category.routes.js.map