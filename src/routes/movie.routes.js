import { Router } from 'express'
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../controllers/movie.controller.js'

const rutas = Router()
rutas.route('/movie')
    .get(getMovies)
    .post(addMovie)

rutas.route('/movie/:id')
    .get(getMovie)
    .delete(deleteMovie)
    .put(updateMovie)

export default rutas