import app from "./src/app/app.js";
import config from "./src/config/config.js";
import connectToDB from "./src/config/db.config.js";

connectToDB()

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});