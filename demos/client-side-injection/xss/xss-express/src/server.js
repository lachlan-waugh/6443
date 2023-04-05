import express from 'express';
import fs from 'fs';
import { db_push, db_pull, db_clear } from './db.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'))

app.get('/', (_, res) => {
    res.end(fs.readFileSync('site/index.html'))
});

app.get('/comments', (_, res) => {
    res.send(JSON.stringify(db_pull()))
});

app.post('/comments', (req, res) => {
    db_push(req.body.comment);
    res.send('success');
});

app.delete('/comments', (_, res) => {
    db_clear()
    res.send('success');
});

app.listen(port, () => console.log(`[*] listening on localhost:${port}`)); 