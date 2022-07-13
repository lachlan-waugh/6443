const bodyParser = require('body-parser');
const express = require('express');
const exphbr = require('express-handlebars');
const session = require('express-session');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'not so secret',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false, httpOnly: false }
}))
app.engine('html', exphbr({
	defaultLayout: 'main',
	extname: '.html'
}));

app.set('view engine', 'html');

const require_login = (req, res, next) => (req.session.user) ? next() : res.redirect('/login')

app.get('/', require_login, (req, res, next) => {
	console.log(`${req.session.user.name} ${db.get_account(req.session.user.name).balance}`)
	res.render('home', {
		username: req.session.user.name,
		balance: db.get_account(req.session.user.name).balance
	});
});

app.get('/login', (req, res, next) => res.render('login'));

app.post('/login', (req, res, next) => {
	const user = db.check_login(req.body.username, req.body.password);
	if (!user.success) return res.status(400).send(user.message);

	req.session.regenerate((error) => {
		if (error) return res.status(500).send(`An unexpected error occurred : ${error}.`);
		req.session.user = { name: user.username };
		res.redirect('/');
	});
});

app.get('/send', require_login, function(req, res, next) {
	const r = db.send_funds(req.query.to, req.session.user.name, req.query.amount)
	(r.success) ? res.redirect('/') : res.status(400).send(r.msg);
});

app.post('/send', require_login, (req, res, next) => {
	const r = db.send_funds(req.body.to, req.session.user.name, req.body.amount)
	(r.success) ? res.redirect('/') : res.status(400).send(r.msg);
});

app.listen(3000, () => console.log('Server started and listening at localhost:3000'));

// --------------------------------------------
// ---------- "Evil" app starts here ----------
// --------------------------------------------

// Let's make another express app.
const evilApp = express();

// Templating middleware.
evilApp.engine('html', exphbr({
	defaultLayout: 'main',
	extname: '.html'
}));

evilApp.set('view engine', 'html');

evilApp.get('/', (req, res, next) => res.render('evil-examples'));

evilApp.get('/malicious-form', (req, res, next) => res.render('malicious-form'));

evilApp.listen(3001, () => console.log('"Evil" server started and listening at localhost:3001'));
