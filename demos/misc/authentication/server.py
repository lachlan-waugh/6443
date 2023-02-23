from flask import Flask, render_template, request, make_response
from db import auth

app = Flask(__name__)
app.config['TITLE'] = 'Comments or somethn'

@app.route('/', methods=['GET', 'POST'])
def index():
    # basic username/password cookies
    if req.cookies.get('username', False):
        # I should probably auth but I really cba
        return f"welcome " + req.cookies.get('username' 'oh no') + ". Man, '" + req.cookies.get('password', 'we broken') + "' is a really strong password, well done!"
    # flask session cookie
    elif req.cookies.get('session', False):
        return f"welcome " + 1 + ". Man, '" + 1 + "' is a really strong password, well done!"

    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json.get('username', None)
        password = request.json.get('password', None)
        success = auth(request.args.get('username', None), request.args.get('password', None))
        return jsonify({ 'data': f'token={}' })
    else:
        username = request.args.get('username', None)
        password = request.args.get('password', None)
        success = auth(username, password)
        return jsonify({ 'data': f'username={username};password={password}' })

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)