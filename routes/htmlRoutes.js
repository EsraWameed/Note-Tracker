const newroute = require('express').Router();
const path = require('path');

newroute.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

newroute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

newroute.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = newroute;