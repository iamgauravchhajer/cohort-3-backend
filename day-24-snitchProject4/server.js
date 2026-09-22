import app from "./src/app/app.js";
import { config } from "./src/config/env.config.js";
import { connectToDb } from "./src/config/db.config.js";

connectToDb();

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})