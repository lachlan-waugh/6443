const express = require('express');
const helper = require('./helper');
const db = require('./db');

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.get('/reflected', (req, res) => {
    res.send(helper.body('reflect'));
});

app.post('/reflected', (req, res) => {
    res.send(helper.body('reflect', req.body.name));
});

app.get('/stored', (_, res) => {
    res.send(helper.body('stored', db.pull()));
});

app.post('/stored', (req, res) => {
    db.push(req.body.name);
    res.send(helper.body('stored', db.pull()));
});

app.get('/dom', (req, res) => {

});

app.post('/dom', (req, res) => {

});

app.listen(port, () => console.log(`[*] listening on localhost:${port}`)); 