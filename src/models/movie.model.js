import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

export const Movie = sequelize.define(
    "movie",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        name: { type: DataTypes.STRING },

        image: { type: DataTypes.STRING }

    },
    {
        timestamps: false,
    }
)