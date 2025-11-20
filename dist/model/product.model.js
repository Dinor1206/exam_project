import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";
const Product = sequelize.define("Product", {
    name: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    rating: { type: Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
    images: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
    details: { type: Sequelize.JSONB, allowNull: true },
    sold_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    categoryId: { type: Sequelize.INTEGER, allowNull: false }
}, { tableName: "products", timestamps: true });
Product.belongsTo(Category, { foreignKey: "categoryId", onDelete: "RESTRICT" });
Category.hasMany(Product, { foreignKey: "categoryId" });
export default Product;
//# sourceMappingURL=product.model.js.map