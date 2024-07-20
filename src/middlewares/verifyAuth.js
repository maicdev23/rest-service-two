import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).json({ msg: 'Sin autorizacion' })
    try {
        const decode = jwt.verify(token, process.env.JWT)
        req.userId = decode.id
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId)

        if (user.userRolId === 1) return next();

        return res.status(403).json({ msg: 'USTED NO SE ENCUENTRA AUTORIZADO!' });
    } catch (error) {
        return res.status(500).json({ msg: 'ERROR INESPERADO :(' })
    }
}

export const isUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId)

        if (user.userRolId === 2) return next();

        return res.status(403).json({ msg: 'USTED NO SE ENCUENTRA AUTORIZADO!' });
    } catch (error) {
        return res.status(500).json({ msg: 'ERROR INESPERADO :(' })
    }
}