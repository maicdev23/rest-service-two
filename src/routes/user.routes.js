import { Router } from 'express'
import { authUser, mainUser } from '../controllers/auth.controller.js'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyAuth.js'
import { addUserRol, getUsersRol } from '../controllers/user-rol.controller.js'

const user = Router()

user.post('/auth', authUser)
user.get('/main', [verifyToken], mainUser)

user.route('/user')
    .get(getUsers)
    .post(addUser)

user.route('/user/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

user.route('/rol')
    .get(getUsersRol)
    .post(addUserRol)

export default user