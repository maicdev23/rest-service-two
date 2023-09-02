import { Movie } from '../models/movie.model.js'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.js";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

initializeApp(firebaseConfig); const storage = getStorage()

export const getMovies = async (req, res) => {
    try{
        const movies = await Movie.findAll()
        return res.status(200).json(movies)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const addMovie = async (req, res) => {
    try{
        const { ...data } = req.body
        const storageRef = ref(storage, `archivos/${Date.now()}`)
        const metadata = { contentType: req.file.mimetype };
        const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata)
        const urlx = await getDownloadURL(snapshot.ref);

        data.image = urlx; data.mimetype = req.file.mimetype;
        const movie = await Movie.create({...data, userId: req.userId})
        return res.status(201).json({msg: `Movie added successfully`, movie})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const getMovie = async (req, res) => {
    try{
        const { id } = req.params
        const movie = await Movie.findByPk(id)
        if(!movie) return res.status(404).json({msg: 'Movie not found'})

        return res.status(200).json(movie)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params

        const movie = await Movie.findOne({where: {id}})
        if(!movie) return res.status(404).json({msg: 'Movie not found'})

        if(!req.file){
            movie.set(req.body); const data = await movie.save()
            return res.status(201).json({msg: `Movie updated successfully`, data})
        }

        const storageRef = ref(storage, movie.image)
        const metadata = { contentType: req.file.mimetype }
        await uploadBytes(storageRef, req.file.buffer, metadata);
        const newFileUrl = await getDownloadURL(storageRef);

        //movie.set(req.body); const data = await movie.save()
        const data = await movie.update({...req.body, image: newFileUrl});
        return res.status(201).json({msg: `Movie updated successfully`, data})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params
        const movie = await Movie.findOne({ where: { id } })
        if(!movie) return res.status(404).json({msg: 'Movie not found'})

        await Movie.destroy({where: {id}})
        const desertRef = ref(storage, movie.image)
        await deleteObject(desertRef);

        return res.status(200).json({msg: `Movie deleted successfully`})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}