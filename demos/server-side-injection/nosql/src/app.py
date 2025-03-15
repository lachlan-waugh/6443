from flask import Flask, render_template, request, current_app, redirect
from db import Database


app = Flask(
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path=''
)

@app.before_first_request
def init():
    if 'DATABASE' not in app.config:
        app.config['DATABASE'] = Database()


@app.route('/')
def root():
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    if request.headers['Content-Type'] == 'application/json':
        # username and password can be non-atomic values
        # (e.g. {'$ne', null} which is the same as WHERE username NOT NULL basically
        username = request.json.get('username', 'None')
        password = request.json.get('password', 'None')
    else:
        username = request.form.get('username', 'None')
        password = request.form.get('password', 'None')

    if current_app.config['DATABASE'].auth(username, password):
        return render_template('login.html', success='ehh I guess that\'s right COMP6443{not-a-real-flag}')
    else:
        return render_template('login.html', error='no lmao'), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
