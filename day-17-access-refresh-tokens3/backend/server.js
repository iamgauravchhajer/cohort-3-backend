import { config } from "./src/config/env.config.js";
import app from "./src/app/app.js";
import { connectToDB } from "./src/config/db.config.js";

connectToDB()

app.listen(config.PORT, ()=>{
    console.log(`server is running on port ${config.PORT}`)
})