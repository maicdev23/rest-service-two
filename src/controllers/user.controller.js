import { User } from '../models/user.model.js'
import { encrypt } from '../helpers/bcrypt.js'

const handleError = (res, err) => res.status(500).json({ err: err.message });

const findUserById = async (id) =>
    await User.findByPk(id, { attributes: { exclude: ['password'] } });

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        return res.status(200).json(users);
    } catch (err) {
        return handleError(res, err);
    }
};

export const addUser = async (req, res) => {
    try {
        const data = { ...req.body };
        const existe = await User.findOne({ where: { username: data.username } });
        if (existe) return res.status(400).json({ msg: `The user ${existe.username} already exists` });

        data.password = await encrypt(data.password);
        const user = await User.create(data);
        return res.status(201).json({ msg: `User added successfully`, user });
    } catch (err) {
        return handleError(res, err);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        return handleError(res, err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.set(req.body);
        await user.save();
        return res.status(200).json({ msg: `User updated successfully`, user });
    } catch (err) {
        return handleError(res, err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ msg: 'User not found' });

        return res.status(200).json({ msg: `User deleted successfully` });
    } catch (err) {
        return handleError(res, err);
    }
};