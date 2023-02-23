from flask import Flask, render_template, request, make_response, session, jsonify
from db import auth

app = Flask(__name__)
app.config['TITLE'] = 'Comments or somethn'
app.config['SECRET_KEY'] = 'trivial'

@app.route('/', methods=['GET', 'POST'])
def index():
    # basic username/password cookies
    if request.cookies.get('username', False):
        # I should probably auth but I really cba
        return f"welcome " + request.cookies.get('username') + ". Man, '" + request.cookies.get('password') + "' is a really strong password, well done!"
    # flask session cookie
    elif session.get('active', False):
        return f"welcome " + session['username'] + ". Man, 'admin' is a really strong password, well done!"

    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        j = request.json
        username = j.get('username', None)
        password = j.get('password', None)

        if auth(username, password):
            session['username'] = username
            return jsonify({ 'data': f'token=asdf', 'success': True })
    else:
        a = request.args
        username = a.get('username', None)
        password = a.get('password', None)

        if auth(username, password):
            return jsonify({ 'user': username, 'pass': password, 'success': True })

    return jsonify({ 'data': 'invalid credentials', 'success': False })

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)