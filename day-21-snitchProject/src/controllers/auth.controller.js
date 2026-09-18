import {userModel} from "../models/user.model.js" 
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js"


const registerUserController = async(req,res)=>{
    try{
        const {email,name,password}= req.body
        
        const isUserAlreadyExists = await userModel.findOne({email})
        if(isUserAlreadyExists){
            return res.status(409).json({
                message:"Invalid request",
                error: [
                    {
                        feild: "email",
                        message:"User with this email already exists"
                    }
                ]
            })
        }
        
        const newUser = await userModel.create({
            email,
            name,
            passwordHash: await bcrypt.hash(password,10) 
        })  

        const accessToken = generateAccessToken(newUser._id,newUser.role)
        const refreshToken = generateRefreshToken(newUser._id,newUser.role)

        res.cookie('accessToken',accessToken, {httpOnly:true})
        res.cookie('refreshToken',refreshToken,{httpOnly:true})

        return res.status(201).json({
            success: true,
            message:"User registered successfully",
            user:newUser,
            accessToken: accessToken
        })

    }catch(error){
        console.log("ERROR while registering user",error)
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

export {registerUserController}