import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

export const User = sequelize.define(
    "user",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        fullname: {
            type: DataTypes.STRING
        },

        username: {
            type: DataTypes.STRING
        },

        password: {
            type: DataTypes.STRING
        },

        role: {
            type: DataTypes.ENUM('ADMIN', 'USER'),
            defaultValue: 'USER'
        }
    },
    {
        timestamps: false,
    }
)