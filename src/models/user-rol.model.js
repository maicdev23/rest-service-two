import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

export const UserRol = sequelize.define(
    'userrol',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        rol: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
    }
)