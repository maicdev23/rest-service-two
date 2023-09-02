import { User } from '../models/user.model.js'
import { encrypt } from '../helpers/bcrypt.js'

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll()
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const addUser = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await User.findOne({where: { username: data.username }})
        if(existe)
            return res.status(400).json({msg: `The user ${existe.username} already exists`})

        data.password = await encrypt(data.password)

        const user = await User.create(data)
        return res.status(201).json({msg: `User added successfully`, user})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const getUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({msg: 'User not found'})

        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.destroy({where: {id} })
        if(!user) return res.status(404).json({msg: 'User not found'})

        return res.status(200).json({msg: `User deleted successfully`})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

export const updateUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findOne({where: {id} })
        if(!user) return res.status(404).json({msg: 'User not found'})

        user.set(req.body); const data = await user.save()
        return res.status(201).json({msg: `User updated successfully`, data})
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}