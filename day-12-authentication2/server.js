import dotenv from 'dotenv'
dotenv.config()
import connectToDb from './src/config/db.config.js'
import app from './src/app/app.js'

connectToDb()

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})