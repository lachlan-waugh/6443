from flask import Flask, render_template, make_response, request

app = Flask(__name__, static_url_path='')


@app.route('/', methods=['GET'])
def main():
    res = make_response(render_template('index.html', email=request.args.get('email', None)))
    res.headers['Content-Security-Policy'] = "script-src 'self' 'unsafe-eval';"
    return res


@app.route('/js/<id>.js', methods=['GET'])
def js(id):
    res = make_response(render_template('template.js', email=id))
    res.headers['Content-Type'] = 'text/javascript'
    return res


@app.route('/report', methods=['GET', 'POST'])
def report():
    return 'no', 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
