import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const isUserExist = await userModel.findOne({ email })

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = await userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const { accessToken, refreshToken } = generateTokens(newUser._id)
        newUser.refreshToken = refreshToken
        await newUser.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })
        res.cookie("accessToken", accessToken, {
            httpOnly: true
        })

        return res.status(200).json({ message: "User registered successfully", newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};

const getProfileController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token Not Found" })
        }

        const token = authHeader.split(" ")[1]

        const decodedToken = verifyAccessToken(token)
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" })
        }

        const user = await userModel.findById(decodedToken.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({ message: "User profile fetched successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const refresh = async (req, res) => {
    try {
        const cookieToken = req.cookies.refreshToken

        if (!cookieToken) {
            return res.status(401).json({ message: "Refresh Token Not Found" })
        }
        
        const decodedToken = verifyRefreshToken(cookieToken)
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" })
        }

        const user = await userModel.findById(decodedToken.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.refreshToken !== cookieToken) {
            user.refreshToken = null
            await user.save()
            return res.status(401).json({ message: "Old token detected, please login again" })
        }

        const { accessToken, refreshToken } = generateTokens(user._id)
        user.refreshToken = refreshToken
        await user.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })
        res.cookie("accessToken", accessToken, {
            httpOnly: true
        })
        
        return res.status(200).json({ message: "User profile fetched successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export { register, getProfileController, refresh }
