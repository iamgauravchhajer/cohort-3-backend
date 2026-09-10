import mongoose from "mongoose"
import { userModel } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js"

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const isUserExist = await userModel.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const { refreshToken, accessToken } = generateTokens(newUser._id)
        newUser.refreshToken = refreshToken
        await newUser.save()

        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.cookie('accessToken', accessToken, { httpOnly: true })

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            accessToken
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export const getProfileController = async (req, res) => {
    try {
        const headerToken = req.headers.authorization
        if (!headerToken || !headerToken.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "token not found"
            })
        }

        const token = headerToken.split(' ')[1]
        const decoded = verifyAccessToken(token)
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "token is invalid"
            })
        }

        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            message: "user fetched successffully",
            user,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export const refreshController = async (req, res) => {
    try {
        const refreshCookie = req.cookies?.refreshToken
        if (!refreshCookie) {
            return res.status(401).json({
                message: "refresh token not found"
            })
        }
        const { id } = verifyRefreshToken(refreshCookie)
        if (!id) {
            return res.status(401).json({
                message: "token is invalid"
            })
        }
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (user.refreshToken !== refreshCookie) {
            user.refreshToken = null
            await user.save()
            return res.status(401).json({
                message: "token mismatch found, logout successfull from all devices"
            })
        }

        const { refreshToken, accessToken } = generateTokens(user._id)
        user.refreshToken = refreshToken
        await user.save()

        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.cookie('accessToken', accessToken, { httpOnly: true })

        return res.status(200).json({
            message: "tokens updated successfully",
            refreshToken,
            accessToken
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}