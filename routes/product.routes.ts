import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createProduct, listProducts, bestSelling, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const productss = Router();
productss.get("/list_products", listProducts);
productss.get("/best-selling", bestSelling);
productss.get("/get_product/:id", getProduct);
productss.post("/create_product", auth, createProduct);
productss.put("/update_product/:id", auth, updateProduct);
productss.delete("/delete_product/:id", auth, deleteProduct);
export default productss;
