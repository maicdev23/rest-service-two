import express, { urlencoded } from 'express';
import cors from "cors";
import path from "path";

import rutas from './routes/movie.routes.js';
import users from './routes/user.routes.js';

export default class Servidor{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors()); this.app.use(express.json())
        this.app.use(express.static(path.resolve('src/public')))
    }
    
    routes(){
        this.app.use('/api/v1', rutas, users)
        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve('src/public/index.html'))
        })
        this.app.use((req, res) => {
            return res.status(404).json({ message: 'Resource not found' });
        })
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}