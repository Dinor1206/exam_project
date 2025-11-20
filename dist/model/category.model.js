import Sequelize from "sequelize";
import sequelize from "../config/db.js";
const Category = sequelize.define("Category", {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    description: { type: Sequelize.STRING, allowNull: true },
}, { tableName: "categories", timestamps: false });
export default Category;
//# sourceMappingURL=category.model.js.map