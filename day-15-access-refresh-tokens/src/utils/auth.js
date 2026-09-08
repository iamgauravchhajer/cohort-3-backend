import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateTokens = (userId) => {
    try {
        const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
        const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15d" })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error generating tokens:", error)
        return null
    }
}

export const verifyAccessToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
        return decodedToken
    } catch (error) {
        console.log("Error verifying access token:", error.message)
        return null
    }
}

export const verifyRefreshToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, config.REFRESH_TOKEN_SECRET)
        return decodedToken
    } catch (error) {
        console.log("Error verifying refresh token:", error.message)
        return null
    }
}
