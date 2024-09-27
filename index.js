import Servidor from './src/server.js';
import { dbc_sequelize } from './src/config/dbc.sequelize.js'

const server = new Servidor()

async function main() {
    await dbc_sequelize()
    server.listen()
}; main()