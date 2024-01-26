import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

import { UserRol } from "./user-rol.model.js";

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

UserRol.hasMany(User, { foreignKey: 'userRolId' })
User.belongsTo(UserRol, { foreignKey: 'userRolId' })