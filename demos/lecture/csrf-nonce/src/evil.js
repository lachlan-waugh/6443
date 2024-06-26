import express from 'express';
import exphbr from 'express-handlebars';

const HOST = 'bank.demos'
const PORT = 80

const app = express();
app.engine('html', exphbr.engine({
  defaultLayout: 'default',
	extname: '.html'
}));
app.set('view engine', 'html');

app.get('/', (_, res) => res.render('get', {HOST: HOST, PORT: PORT}));

app.get('/clickme', (_, res) => res.render('button', {HOST: HOST, PORT: PORT}));

app.get('/post', (_, res) => res.render('post'));

app.get('/form', (_, res) => res.render('form', {HOST: HOST, PORT: PORT}));

app.listen(8002, () => console.log(`evil server listening @ localhost:8002`));
