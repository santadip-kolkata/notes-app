const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Import the routes
const pdfRoutes = require('./routes/pdfRoutes');

// Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use(pdfRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'general.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
