import jwt from 'jsonwebtoken'
import authModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const registerController = async (req, res) => {
    const { name, email, password } = req.body
    const user = await authModel.create({
        name,
        email,
        password : bcrypt.hashSync(password, 10)
    })
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )
    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
}

const getProfileController = async (req, res) => {
    res.status(200).json({
        message: "User fetched successfully",
        user: req.user
    })
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    const user = await authModel.findOne({ email })
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log(isValidPassword)
    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )
    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })
}


export { registerController, getProfileController, loginController }