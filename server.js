const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Correct path
const contactRoutes = require('./routes/contactRoutes'); // Correct path
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
