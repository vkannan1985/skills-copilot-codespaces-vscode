// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Set up the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Set up the server
app.use(express.static('public'));
app.use(bodyParser.json());

// Get the comments
app.get('/comments', (req, res) => {
    const comments = fs.readFileSync(path.resolve(__dirname, 'comments.json'));
    res.send(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'comments.json')));
    comments.push(req.body);
    fs.writeFileSync(path.resolve(__dirname, 'comments.json'), JSON.stringify(comments));
    res.send(comments);
});