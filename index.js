const path = require('path');
const express = require('express');
const jwt = require("jsonwebtoken");
const connectDb = require('./config/db');
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/authenticateToken");
const app = express();
const PORT = 3000;

connectDb();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// connect to database

// Import the routes
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require("./routes/userRoutes");

// Middleware to serve static files from the public folder

// enable json response
app.use(express.json());

// Use the routes
app.use(pdfRoutes);
app.use("/auth",userRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'general.html'));
});

app.get('/private',authenticateToken,(req, res) => 
{
    res.sendFile(path.join(__dirname, 'pages', 'private.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
