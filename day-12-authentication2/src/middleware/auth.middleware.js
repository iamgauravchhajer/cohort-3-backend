import jwt from 'jsonwebtoken'
import authModel from '../models/user.model.js'

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(tokenData.id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    req.user = user; 
    next()
}