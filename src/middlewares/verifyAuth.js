import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) =>{
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).json({ msg: 'Sin autorizacion' })
    try{
        const decode = jwt.verify(token, process.env.JWT)
        req.userId = decode.id
        next()
    }catch(err){
        return res.status(500).json({ msg: err.message })
    }
}