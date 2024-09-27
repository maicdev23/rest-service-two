import { Router } from 'express'
import multer from "../middlewares/uploadFile.js";
import { verifyToken } from '../middlewares/verifyAuth.js';
import { addPost, deletePost, fullPosts, getPost, getPosts, updatePost } from '../controllers/post.controller.js';
import { isPostOwner } from '../middlewares/verifyPost.js';

const post = Router()

post.route('/post')
    .get([verifyToken], getPosts)
    .post([verifyToken], [multer], addPost)

post.route('/post/:id')
    .put([verifyToken, isPostOwner], [multer], updatePost)
    .get([verifyToken, isPostOwner], getPost)
    .delete([verifyToken, isPostOwner], deletePost)

post.get('/posts', fullPosts)

export default post