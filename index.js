import dotenv from 'dotenv/config'
if(process.env.NODE_ENV === 'production'){ dotenv }

import Servidor from './src/server.js';

import { dbc_sequelize } from './src/config/dbc.sequelize.js'

async function main(){
    const server = new Servidor()
    await server.listen()
    await dbc_sequelize()
}; main()