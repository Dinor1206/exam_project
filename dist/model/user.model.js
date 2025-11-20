import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING, allowNull: true },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: "users",
    timestamps: true
});
export default User;
//# sourceMappingURL=user.model.js.map