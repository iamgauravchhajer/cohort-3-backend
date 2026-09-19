import { verifyAccessToken } from "../utils/auth.utils.js"

export function authenticate(req, res, next){
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "accessToken not found in headers",
        })
    }
    
    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
        return res.status(401).json({
            message: "accessToken not found in headers",
        })
    }
    
    try {
        const decodedToken = verifyAccessToken(accessToken)
        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid accessToken",
        })
    }   
}