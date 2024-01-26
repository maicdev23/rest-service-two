import { Router } from 'express'
import { authUser, mainUser } from '../controllers/auth.controller.js'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'
import { isAdmin, isUser, verifyToken } from '../middlewares/verifyAuth.js'

const rutas = Router()

rutas.post('/auth', authUser)
rutas.get('/main', [ verifyToken ], [ isAdmin ], mainUser)

rutas.route('/user')
    .get(getUsers)
    .post(addUser)

rutas.route('/user/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

export default rutas