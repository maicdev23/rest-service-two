import { Router } from "express";
import { addUserRol, getUsersRol } from "../controllers/user-rol.controller.js";

const rutas = Router()

rutas.get('/rol', getUsersRol)
rutas.post('/rol', addUserRol)

export default rutas