import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

import { User } from "./user.model.js";

export const Movie = sequelize.define(
    "movie",
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

        name: { type: DataTypes.STRING },

        image: { type: DataTypes.STRING },

        mimetype: { type: DataTypes.STRING }

    },
    {
        timestamps: false,
    }
)

User.hasMany(Movie, { foreignKey: 'userId' })
Movie.belongsTo(User, { foreignKey: 'userId' })