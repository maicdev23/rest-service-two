import { Movie } from '../models/movie.model.js'

export const getMovies = async (req, res) => {
    try{
        const movies = await Movie.findAll()
        return res.status(200).json(movies)
    }catch(err){
        return res.json({err: err.message})
    }
}

export const addMovie = async (req, res) => {
    try{
        const { ...data } = req.body
        const movie = await Movie.create(data)
        return res.status(201).json({msg: `Movie added successfully`, movie})
    }catch(err){
        return res.json({err: err.message})
    }
}

export const getMovie = async (req, res) => {
    try{
        const { id } = req.params
        const movie = await Movie.findByPk(id)
        return res.status(200).json(movie)
    }catch(err){
        return res.json({err: err.message})
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params
        await Movie.destroy({where: {id} })
        return res.status(200).json({msg: `Movie deleted successfully`})
    }catch(err){
        return res.json({err: err.message})
    }
}

export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params
        const movie = await Movie.findOne({where: {id} })
        movie.set(req.body)
        const data = await movie.save()
        return res.status(201).json({msg: `Movie updated successfully`, data})
    }catch(err){
        return res.json({err: err.message})
    }
}