import express from 'express';
import fs from 'fs';
import { db_push, db_pull } from './db.js';

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.end(fs.readFileSync('./static/index.html'))
});

app.get('/blogs', (req, res) => {
    res.send(JSON.stringify(db_pull()))
});

app.post('/blogs', (req, res) => {
    db_push(req.body.content);
    res.send('success');
});

app.listen(port, () => console.log(`[*] listening on localhost:${port}`)); 