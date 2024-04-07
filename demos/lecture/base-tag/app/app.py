from flask import Flask, render_template, request, make_response
from base64 import b64encode
from secrets import token_bytes

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET'])
def home():
    nonce = b64encode(token_bytes(16)).decode()
    res = make_response(
        render_template('index.html', query=request.args.get('q'), nonce=nonce)
    )
    res.headers.set(
        'Content-Security-Policy',
        f"script-src 'nonce-{nonce}'"
    )
    return res


@app.route('/self', methods=['GET'])
def self(): 
    res = make_response(
        render_template('index.html', query=request.args.get('q'))
    )
    res.headers.set('Content-Security-Policy', "script-src 'self'")
    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
