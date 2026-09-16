import app from "./src/app/app.js";
import { connectToDB } from "./src/config/db.config.js";

connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});