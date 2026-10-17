const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('../config/passport.config');
const authRoutes = require('../routes/auth.routes');
const ENV = require('../config/env.config');

const app = express();

// Trust reverse proxy (useful for production, Render, AWS, Nginx)
app.set('trust proxy', 1);

// Global Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/auth')) {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
  }
  next();
});

module.exports = app;
