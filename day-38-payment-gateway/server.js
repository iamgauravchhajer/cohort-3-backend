const { PORT } = require("./src/config/env.config");
const connectDB = require("./src/config/db.config");
const app = require("./src/app/app");

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
