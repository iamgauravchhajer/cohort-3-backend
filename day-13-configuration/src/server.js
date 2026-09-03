import app from "./app/app.js";
import connectDB from "./config/db.config.js";
import config from "./config/config.js";

const PORT = config.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});