import { Post } from '../models/post.model.js'
import { supabaseClient } from '../config/supabase.js';

export const getPosts = async (req, res) => {
    try{
        const post = await  Post.findAll({
            where: { userId: req.userId }
        })
        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const addPost = async (req, res) => {
    try{
        const { ...data } = req.body
        
        const upload = await supabaseClient.storage.from('react-file').upload('file'+Date.now(), req.file.buffer)
        const urlimg = 'https://ehjwfhdshwjdzhwezdsj.supabase.co/storage/v1/object/public/'+upload.data.fullPath
        
        data.cdn_file = urlimg;
        data.filename = upload.data.path;
        data.mimetype = req.file.mimetype;

        const post = await Post.create({...data, userId: req.userId})
        return res.status(201).json({msg: `Post added successfully`, post})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const getPost = async (req, res) => {
    try{
        const { id } = req.params
        const post = await Post.findByPk(id)

        if(!post) return res.status(404).json({msg: 'Post not found'})

        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const updatePost = async (req, res) => {
    try{
        const { id } = req.params; const data = req.body;

        const post = await Post.findOne({where: {id}})
        if(!post) return res.status(404).json({msg: 'Post not found'})

        if(!req.file){ 
            post.set(data); await post.save()
            return res.status(201).json({msg: `Post updated successfully`})
        }

        await supabaseClient.storage.from('react-file').update(post.filename, req.file.buffer)
        
        data.mimetype = req.file.mimetype;

        await post.update(data);
        return res.status(201).json({msg: `Post updated successfully`})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const deletePost = async (req, res) => {
    try{
        const { id } = req.params
        const post = await Post.findOne({ where: { id } })
        if(!post) return res.status(404).json({msg: 'Post not found'})

        await Post.destroy({where: {id}})
        await supabaseClient.storage.from('react-file').remove([post.filename])

        return res.status(200).json({msg: `Post deleted successfully`})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const fullPosts = async (req, res) => {
    try{
        const posts = await Post.findAll()
        return res.status(200).json(posts)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}