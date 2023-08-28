import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

export const User = sequelize.define(
    "user",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        fullname: { type: DataTypes.STRING },

        username: { type: DataTypes.STRING },

        password: { type: DataTypes.STRING }

    },
    {
        timestamps: false,
    }
)