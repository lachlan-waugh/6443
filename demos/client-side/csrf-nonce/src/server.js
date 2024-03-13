import express from 'express';
import session from 'express-session';
import exphbr from 'express-handlebars';
import { check_login, get_account, send_funds } from './db.js';
import { v1 as uuid } from 'uuid';

let token = 1 // uuid(); // 'abcd1234' // 

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: 'OhManYoullNeverGuessThis',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false, httpOnly: false }
}))
app.engine('html', exphbr.engine({
	defaultLayout: 'main',
	extname: '.html'
}));

app.set('view engine', 'html');

const require_login = (req, res, next) => (req.session.user) ? next() : res.redirect('/login')

app.get('/', require_login, (req, res, next) => {
	token++;
	// tokens.push(token);
	res.render('bank/home', {
		username: req.session.user.name,
		balance: get_account(req.session.user.name).user.balance,
		token: token
	});
});

app.get('/login', (req, res, next) => res.render('bank/login'));

app.post('/login', (req, res, next) => {
	const user = check_login(req.body.username, req.body.password);
	if (!user.success) return res.status(400).send(user.message);

	req.session.regenerate((error) => {
		if (error) return res.status(500).send(`An unexpected error occurred : ${error}.`);
		req.session.user = { name: user.user.username };
		res.redirect('/');
	});
});

app.get('/send', require_login, function(req, res, next) {
	console.log(req.body.token)
	console.log(token)
	if (token !== req.query.csrf) return res.status(400).send('CSRF detected I\'m calling the feds!!');
	const r = send_funds(req.query.to, req.session.user.name, req.query.amount);
	(r.success) ? res.redirect('/') : res.status(400).send(r.msg);
});

app.post('/send', require_login, (req, res, next) => {
	if (req.body.token !== token) return res.status(400).send('CSRF detected I\'m calling the feds!!');
	const r = send_funds(req.body.to, req.session.user.name, req.body.amount);
	(r.success) ? res.redirect('/') : res.status(400).send(r.msg);
});

app.listen(3000, () => console.log('bank server listening @ localhost:3000'));
