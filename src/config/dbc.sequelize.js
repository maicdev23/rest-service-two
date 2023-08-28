import { sequelize } from './conn.js'

export const dbc_sequelize = async () =>{
    try{
        await sequelize.sync({force: false})
        console.log('Conexion exitosa con la base de datos')
    }catch(err){
        console.error('Error de conexion: ' + err.message)
    }
}