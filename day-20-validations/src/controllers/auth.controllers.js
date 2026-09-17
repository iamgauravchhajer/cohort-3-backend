import { userModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

const registerUserController = async (req, res) => {
    try {
        const { email, phone, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({ 
            email, 
            phone, 
            passwordHash: hashedPassword 
        })
        await user.save()

        return res.status(201).json({
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export { registerUserController }
