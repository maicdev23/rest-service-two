import { Router } from 'express'
import { addMovie, deleteMovie, freeMovie, getMovie, getMovies, updateMovie } from '../controllers/movie.controller.js'
import multer from "../middlewares/uploadFile.js";
import { verifyToken } from '../middlewares/verifyAuth.js';

const rutas = Router()
rutas.get('/movie', [ verifyToken ], getMovies)
rutas.post('/movie', [ verifyToken ], [ multer ], addMovie)
rutas.put('/movie/:id', [ verifyToken ], [ multer ], updateMovie)

rutas.route('/movie/:id')
    .get(getMovie)
    .delete(deleteMovie)

rutas.get('/movies', freeMovie)

export default rutas