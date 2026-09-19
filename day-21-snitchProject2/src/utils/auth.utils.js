import jwt from 'jsonwebtoken'
import { config } from '../config/env.config.js';

export const generateAccessToken = (userId, role)=>{
    return jwt.sign({userId, role}, config.ACCESS_TOKEN_SECRET,{expiresIn: "15m"})
}

export const generateRefreshToken = (userId, role)=>{
    return jwt.sign({userId, role}, config.REFRESH_TOKEN_SECRET,{expiresIn: "7d"})
}

export const verifyAccessToken = (token)=>{
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken = (token)=>{
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET)
}