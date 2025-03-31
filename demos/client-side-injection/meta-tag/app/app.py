from flask import Flask, render_template, request
from base64 import b64encode
from secrets import token_bytes

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET'])
def home():
    nonce = b64encode(token_bytes(16)).decode()
    return render_template(
        'index.html',
        query=request.args.get('q'),
        nonce=nonce
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
