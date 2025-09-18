require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // Crée app avant de l’utiliser

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
require('./swagger')(app); //après la création de app

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// Middleware requireAuth
const requireAuth = require('./middlewares/requireAuth');
app.get('/protected', requireAuth, (req, res) => {
  res.json({ msg: 'This is protected data', user: req.user });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
