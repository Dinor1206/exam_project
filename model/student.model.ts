import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define("Student", {
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    profession: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: "students",
    timestamps: false
});

export default Student;