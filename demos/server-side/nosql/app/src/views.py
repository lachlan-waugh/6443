from flask import Blueprint, render_template, request, current_app, redirect

views = Blueprint('views', __name__)


@views.route('/')
def root():
    return redirect('/login')


@views.route('/login', methods=['GET', 'POST'])
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
        return render_template('login.html', success='ehh I guess that\'s right COMP6443FINAL{waitButUserInputIsFineIfTheresNoSqlRight}')
    else:
        return render_template('login.html', error='no lmao'), 400