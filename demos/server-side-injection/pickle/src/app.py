import pickle
import base64
import os
from flask import Flask, request, request, make_response, render_template

app = Flask(__name__, template_folder='templates')

default_user = {
    'username': 'melon',
    'role': 'guest',
}

@app.route("/", methods=["GET", "POST"])
def index():
    session = request.cookies.get('session')
    if not session:
        user = default_user
    else:
        data = pickle.loads(base64.b64decode(session))
        user = {
            'username': data.get('username', default_user['username']),
            'role': data.get('role', default_user['role']),
        }

    token = pickle.dumps(user)
    res = make_response(render_template('index.html', user=user))
    res.set_cookie('session', base64.b64encode(token).decode())
    return res

if __name__ == "__main__":
    app.run(debug=True)
