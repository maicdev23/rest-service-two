import { Router } from 'express'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'

const rutas = Router()
rutas.route('/user')
    .get(getUsers)
    .post(addUser)

rutas.route('/user/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

export default rutas