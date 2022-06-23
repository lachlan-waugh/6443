const express = require('express');

const app = express();
const port = 3000;

const SECRET = 'MY_GREAT_SECRET'

app.get('/', (req, res) => {
    
});

app.get('/secret', (req, res) => {
    if (req.secret !== SECRET) {
        res.send('NOT AUTHENTICATED');
    } else {

    }
});

const someObject = window.someObject || {};

app.listen(port, () => console.log(`[*] listening on localhost:${port}`));