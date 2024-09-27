import { Router } from 'express'
import { authUser, mainUser } from '../controllers/auth.controller.js'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'
import { isAdmin, verifyToken } from '../middlewares/verifyAuth.js'

const user = Router()

user.post('/auth', authUser)
user.get('/main', [verifyToken], mainUser)

user.post('/admin', [verifyToken, isAdmin], addUser)

user.route('/user')
    .get(getUsers)
    .post(addUser)

user.route('/user/:id')
    .get([verifyToken], getUser)
    .delete([verifyToken], deleteUser)
    .put([verifyToken], updateUser)

export default user