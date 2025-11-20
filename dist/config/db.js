import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize({
    dialect: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    logging: false
});
export default sequelize;
export async function connectDB() {
    await sequelize.authenticate();
    console.log("connected to DB");
    await sequelize.sync({ force: false });
}
//# sourceMappingURL=db.js.map