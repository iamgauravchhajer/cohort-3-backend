import app from "./src/app/app.js";
import { config } from "./src/config/env.config.js";
import { connectToDb } from "./src/config/db.config.js";

await connectToDb()

app.listen(config.PORT, () => {
    console.log(`server is running on ${config.PORT}`)
})