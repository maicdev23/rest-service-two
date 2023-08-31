import { Router } from 'express'
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../controllers/movie.controller.js'
import multer from "../middlewares/uploadFile.js";

const rutas = Router()
rutas.get('/movie', getMovies)
rutas.post('/movie', [ multer ], addMovie)
rutas.put('/movie/:id', [ multer ], updateMovie)

rutas.route('/movie/:id')
    .get(getMovie)
    .delete(deleteMovie)

export default rutas