from flask import Flask, render_template, request, session, redirect
from db import authorize, send_funds, get_user, disable_flag
import urllib.parse
import requests

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'ANOTHER_CRAZY_SECRET_YOU_WONT_GUESS'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False


@app.route('/', methods=['GET'])
def main():
	if session.get('username', None):
		user = get_user(session['username'])
		return render_template('home.html', username=user[0], balance=user[1], has_flag=user[2])
	else:
		return redirect('/login', code=302)

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		req = request.json
		username = req.get('username', None)
		password = req.get('password', None)

		if not username or not password:
			return 'invalid request, please supply a username and password', 400

		user = authorize(username, password)
		if user == None:
			return 'database error detected, oh no', 500
		elif user:
			disable_flag(username)
			session['username'] = username
			return 'authorization successful, redirecting', 302
		else:
			return 'authorization failed! username or password incorrect', 400

	else:
		return render_template('login.html')

@app.route('/send', methods=['POST'])
def send():
	if session.get('username', None):
		try:
			req = request.json
			send_funds(session['username'], req['to'], req['amount'])
			return 'I totally cba actually making it actually send the money\n(but imagine it does), beep boop computers', 400
		except:
			send_funds(session['username'], request.form['to'], request.form['amount'])
			return 'I totally cba actually making it actually send the money\n(but imagine it does), beep boop computers', 400
	else:
		return 'nah you gotta be authed first', 400

@app.route('/question', methods=['GET'])
def question():
	question = request.args.get('q', None)

	# Then let the user view it as normal
	return render_template('question.html', question=question)

@app.route('/robots.txt', methods=['GET'])
def robots():
    return 'User-Agent *\nDisallow: /question'

@app.route('/report', methods=['POST'])
def report():
	return "Nothing to do."


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000)
