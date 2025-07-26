import { imagekit } from '../config/imagekit.js'
import { Post } from '../models/post.model.js'

// Función auxiliar para manejar errores
const handleError = (res, err) => res.status(500).json({ err: err.message });

// Función auxiliar para obtener un post por id
const findPostById = async (id) => await Post.findOne({ where: { id } });

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { userId: req.userId } });
        return res.status(200).json(posts);
    } catch (err) {
        return handleError(res, err);
    }
};

export const addPost = async (req, res) => {
    try {
        const data = req.body;

        if (!req.file)
            return res.status(400).json({ msg: 'POR FAVOR SELECCIONE UN FILE VALIDO.' });

        const result = await imagekit.upload({
            file: req.file.buffer,
            fileName: Date.now().toString(),
            folder: 'express',
        });

        Object.assign(data, {
            url: result.url,
            fileId: result.fileId,
            mimetype: req.file.mimetype,
            userId: req.userId,
        });

        const post = await Post.create(data);
        return res.status(201).json({ msg: 'Post added successfully', post });
    } catch (err) {
        return handleError(res, err);
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await findPostById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        return res.status(200).json(post);
    } catch (err) {
        return handleError(res, err);
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const post = await findPostById(id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (req.file) {
            if (post.fileId) await imagekit.deleteFile(post.fileId);

            const result = await imagekit.upload({
                file: req.file.buffer,
                fileName: Date.now().toString(),
                folder: 'express',
            });

            Object.assign(data, {
                url: result.url,
                fileId: result.fileId,
                mimetype: req.file.mimetype,
            });
        }

        await post.update(data);
        return res.status(200).json({ msg: 'Post updated successfully' });
    } catch (err) {
        return handleError(res, err);
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await findPostById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.fileId) await imagekit.deleteFile(post.fileId);
        await Post.destroy({ where: { id: req.params.id } });

        return res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (err) {
        return handleError(res, err);
    }
};

export const fullPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).json(posts);
    } catch (err) {
        return handleError(res, err);
    }
};