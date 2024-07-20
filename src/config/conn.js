import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    process.env.POSTGRES_URI,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true
            }
        },
        logging: false
    }
);