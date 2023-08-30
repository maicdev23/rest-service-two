import { Router } from 'express'
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../controllers/movie.controller.js'
import multer from "../middlewares/uploadFile.js";

const rutas = Router()
rutas.get('/movie', getMovies)
rutas.post('/movie', [ multer ], addMovie)

rutas.route('/movie/:id')
    .get(getMovie)
    .delete(deleteMovie)
    .put(updateMovie)

export default rutas