const express = require('express');
import db from './database'; 

const app = express();
const port = 3000;
// app.use(express.urlencoded({ extended: true }));

// who cares about maintaining sessions lmao
app.post('/', (req, res) => {
    const { user, pass, token } = req.body;

    if (token.valid) {
        res,send(`welcome ${user}. Man, '${pass}' is a really strong password, well done!`);
    } else {
        res.send('NOT AUTHORISED!!');
    }
})

app.get('/login', (req, res) => res.end(fs.readFileSync('./site/login.html')));

app.post('/login', (req, res) => {
    const result = db.prepare(`SELECT * FROM users WHERE username = ${user} and password = ${pass}`).get();

    if (result) {
        redirect('/', )
    } else {

    }
});

app.get('/blogs', (req, res) => {

})

app.post('/blogs', (req, res) => {

});

app.listen(port, () => console.log(`[*] listening on localhost:${port}`));
