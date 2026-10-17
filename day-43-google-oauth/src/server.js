const app = require('./app/app');
const connectDB = require('./config/db.config');
const ENV = require('./config/env.config');

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server listening on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize server:', err);
    process.exit(1);
  }
};
startServer();
