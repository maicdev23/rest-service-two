import { Router } from "express";

import rutas from './movie.routes.js';
import users from './user.routes.js';
import rols from './user-rol.routes.js';

const router = Router()

router.use('/api/v1', rutas, users, rols);
router.use('*', (req, res) => {
    return res.status(404).json({ message: 'Resource not found' });
})

export default router