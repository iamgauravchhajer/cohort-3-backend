import jwt from 'jsonwebtoken'
import { config } from '../config/env.config.js'

export const generateTokens = (userId) => {
    try {
        const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        return { refreshToken, accessToken }
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.REFRESH_TOKEN_SECRET)
    } catch (error) {
        console.log(error.message)
        return null
    }
}