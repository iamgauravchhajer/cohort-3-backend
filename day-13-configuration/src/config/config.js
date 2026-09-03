import dotenv from 'dotenv'
dotenv.config()

const config = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
}

export default config