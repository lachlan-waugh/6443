const express = require('express');
const helper = require('./helper');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(helper.body(req.headers.cookie));
});

app.post('/', (req, res) => {
    const name = req.body.name;
    console.log('name ', req.body);
    helper.headers(res, 'asdadsd');
    res.send(helper.body(name));
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}.`);
});