import { Router } from 'express'
import multer from "../middlewares/uploadFile.js";
import { verifyToken } from '../middlewares/verifyAuth.js';
import { addPost, deletePost, fullPosts, getPost, getPosts, updatePost } from '../controllers/post.controller.js';

const post = Router()

post.route('/post')
    .get([ verifyToken ], getPosts)
    .post([ verifyToken ], [ multer ], addPost)

post.route('/post/:id')
    .put([ verifyToken ], [ multer ], updatePost)
    .get(getPost)
    .delete(deletePost)

post.get('/posts', fullPosts)

export default post