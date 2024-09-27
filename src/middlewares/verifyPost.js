import { Post } from "../models/post.model.js";

export const isPostOwner = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (post.userId.toString() !== req.userId)
            return res.status(403).json({ msg: 'USTED NO SE ENCUENTRA AUTORIZADO!' });

        next()

    } catch (error) {
        return res.status(500).json({ msg: 'ERROR INESPERADO :(' });
    }
};