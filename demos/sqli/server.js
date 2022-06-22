import express from 'express';
import execute from './src/database.js'; 
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

const SECRET = "SECRET_PASSWORD_123";

app.get('/', (_, res) => res.redirect('/login'));
app.post('/', (req, res) => {
    // who cares about maintaining sessions lmao
    const { user, pass, token } = req.body;

    if (token === "SUPER_PASSWORD_123") {
        res,send(`welcome ${user}. Man, '${pass}' is a really strong password, well done!`);
    } else {
        res.send('NOT AUTHORISED!!');
    }
});

app.get('/login', (req, res) => res.end(fs.readFileSync('./site/login.html')));

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    console.log(`${user} ${pass}`)

    res.end(execute(`SELECT username, password FROM users WHERE username = '${user}' AND password = '${pass}'`, false));
});

// app.get('/blogs', (req, res) => {

// });

// app.post('/blogs', (req, res) => {

// });

app.listen(port, () => console.log(`[*] listening on localhost:${port}`));
