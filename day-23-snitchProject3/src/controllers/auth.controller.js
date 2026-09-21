import {userModel} from "../models/user.model.js" 
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/auth.utils.js"

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

        res.cookie('refreshToken',refreshToken,{httpOnly:true})

        await userModel.findByIdAndUpdate(newUser._id,{refreshToken:refreshToken})

        return res.status(201).json({
            success: true,
            message:"User registered successfully",
            userData: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
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

const loginUserController = async(req,res)=>{
    try{
        const {email,password} = req.body
        
        const user = await userModel.findOne({email})
        if(!user){return res.status(400).json({
            message: "Invalid email or password",
        })}
        
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
        if(!isPasswordCorrect){return res.status(400).json({
            message: "Invalid email or password",
        })}

        const accessToken = generateAccessToken(user._id,user.role)
        const refreshToken = generateRefreshToken(user._id,user.role)

        res.cookie('refreshToken',refreshToken,{httpOnly:true})

        await userModel.findByIdAndUpdate(user._id,{refreshToken:refreshToken})

        return res.status(200).json({
            success: true,
            message:"User logged in successfully",
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken: accessToken
        })

    }catch(error){
        console.log("ERROR while login user",error)
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
} 

const refreshAccessTokenController = async(req,res)=>{
    try{
       const refreshToken = req.cookies.refreshToken 
       if(!refreshToken){
        return res.status(401).json({
            message: "Refresh token not found",
        })
       }

       let decodedToken;
       try {
           decodedToken = verifyRefreshToken(refreshToken)
       } catch (err) {
           return res.status(401).json({
               message: "Refresh token is invalid or expired",
           })
       }

       const user = await userModel.findById(decodedToken.userId)

       if(!user){
        return res.status(401).json({
            message: "User not found",
        })
       }

       if(user.refreshToken !== refreshToken){
        await userModel.findByIdAndUpdate(user._id,{refreshToken:null})
        res.clearCookie('refreshToken')
        return res.status(401).json({
            message: "Refresh token leak detected, please login again",
        })
       }

       const accessToken = generateAccessToken(user._id,user.role)
       const newRefreshToken = generateRefreshToken(user._id,user.role)

       res.cookie('refreshToken',newRefreshToken,{httpOnly:true})

       await userModel.findByIdAndUpdate(user._id,{refreshToken:newRefreshToken})

       return res.status(200).json({
           success: true,
           message:"Access token refreshed successfully",
           userData: {
               _id: user._id,
               name: user.name,
               email: user.email
           },
           accessToken: accessToken
       })
    }catch(error){
        console.log("ERROR while refreshing access token",error)
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

const getUserProfileController = async(req,res)=>{
    try{
        const {userId} = req.user;
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        return res.status(200).json({
            success: true,
            message:"User profile fetched successfully",
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(error){
        console.log("ERROR while fetching user profile",error)
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

export {registerUserController, loginUserController, refreshAccessTokenController, getUserProfileController}