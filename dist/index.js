import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
// import models
import "./model/category.model.js";
import "./model/category.model.js";
import "./model/product.model.js";
// routes
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
// health
app.get("/health", (_req, res) => res.json({ ok: true }));
// api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
// not found and errors
app.use(notFound);
app.use(errorHandler);
const PORT = Number(process.env.PORT) || 3000;
async function start() {
    await connectDB();
    app.listen(PORT, () => {
        console.log("server is running at:", PORT);
    });
}
start().catch((e) => {
    console.error("Failed to start server", e);
    process.exit(1);
});
//# sourceMappingURL=index.js.map