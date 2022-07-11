import express from 'express';
import fs from 'fs';

import { db_push, db_pull } from './db.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.end(fs.readFileSync('./static/index.html'))
});

app.get('/reflected', (req, res) => {
    res.end(fs.readFileSync('./static/index.html'));
});

app.get('/stored', (_, res) => {
    res.end(fs.readFileSync('./static/index.html'));
});

app.get('/dom', (req, res) => {
    res.end(fs.readFileSync('./static/index.html'));
});

app.post('/blogs', (req, res) => {
    db_push(req.body.content);
    res.send('success');
});

app.get('/blogs', (req, res) => {
    res.send(JSON.stringify(db_pull()))
});

app.listen(port, () => console.log(`[*] listening on localhost:${port}`)); 
