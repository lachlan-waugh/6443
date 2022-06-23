import express from 'express';
import execute from './src/database.js'; 
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

const SECRET = "SECRET_PASSWORD_123";

app.get('/', (req, res) => {
    const { secret, user, pass } = req.query;

    // now this, is security B)
    if (secret) {
        res.send(`welcome ${user}. Man, '${pass}' is a really strong password, well done!`);
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (_, res) => res.end(fs.readFileSync('./site/login.html')));

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    let result;

    if (req.body.hasOwnProperty('b1')) {
        result = execute(`SELECT * from users WHERE username = '${user}' AND password = '${pass}'`);
    } else if (req.body.hasOwnProperty('b2')) {
        result = execute(`SELECT * from users WHERE (username = '${user}' AND password = '${pass}')`);
    } else if (req.body.hasOwnProperty('b3')) {
        result = execute(`SELECT * from users WHERE (username = '${user.replace(/OR/gi, '')}' AND password = '${pass}')`, true);
    } else {
	result = { success: false, data: 'nah man' };
    }

    if (result.success) {
        res.redirect(`/?secret=${SECRET}&user=${user}&pass=${pass}`)
    } else {
        res.end(JSON.stringify(result.data));
    }
});

// app.get('/blogs', (req, res) => {

// });

// app.post('/blogs', (req, res) => {

// });

app.listen(port, () => console.log(`[*] listening on localhost:${port}`));
