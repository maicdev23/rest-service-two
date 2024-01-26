import { UserRol } from "../models/user-rol.model.js";

export const getUsersRol = async (req, res) => {
    try{
        const data = await UserRol.findAll()
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const addUserRol = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await UserRol.findOne({where: { rol: data.rol }})

        if(existe) return res.status(400).json({msg: `The user rol ${data.rol} is already registered`})

        const userRol = await UserRol.create(data)
        return res.status(201).json({msg: `The user rol added successfully`})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}