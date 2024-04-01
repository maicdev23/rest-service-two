import { Router } from "express";

import post from './post.routes.js';
import user from './user.routes.js';

const router = Router()

router.use('/api', post, user);
router.use('*', (req, res) => {
    return res.status(404).json({ message: 'Resource not found' });
})

export default router