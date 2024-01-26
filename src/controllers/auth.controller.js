import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { Movie } from "../models/movie.model.js";
import { decrypt } from "../helpers/bcrypt.js";

export const authUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const existe = await User.findOne({ where: {username: username} })
        if(!existe) return res.status(404).json({ msg: 'Usuario no encontrado' })

        const match = await decrypt(password, existe.password)
        if(!match) return res.status(404).json({ msg: 'Contraseña incorrecta' })

        const token = jwt.sign({id: existe.id}, process.env.JWT, { expiresIn: '1h' })
        return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token, usuario: existe })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const mainUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } })
        const movie = await Movie.findAll({where: { userId: req.userId}})
        return res.status(200).json({user, movie})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}