import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: String(process.env.DB_HOST as string),
  port: Number(process.env.DB_PORT as string),
  username: String(process.env.DB_USER as string),
  password: String(process.env.DB_PASSWORD as string),
  database: String(process.env.DB_DATABASE as string),
  logging: false
});

export default sequelize;

export async function connectDB() {
  await sequelize.authenticate();
  console.log("connected to DB");
  await sequelize.sync({ force: false });
}