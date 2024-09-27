import express from 'express';
import cors from "cors";
import path from "path";

import router from "./routes/index.js";


export default class Servidor {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors()); this.app.use(express.json())
        //this.app.use(express.static(path.resolve('src/public')))
    }

    routes() {
        this.app.use('/', router)
        //this.app.get('*', (req, res) => res.sendFile(path.resolve('src/public/index.html')) )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}