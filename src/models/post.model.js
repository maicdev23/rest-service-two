import { DataTypes } from 'sequelize'
import { sequelize } from '../config/conn.js'

import { User } from "./user.model.js";

export const Post = sequelize.define(
    "post",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        name: {
            type: DataTypes.STRING, defaultValue: 'Post of user'
        },

        cdn_file: {
            type: DataTypes.STRING
        },

        filename: {
            type: DataTypes.STRING
        },

        mimetype: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: false,
    }
)

User.hasMany(Post, { foreignKey: 'userId' })
Post.belongsTo(User, { foreignKey: 'userId' })