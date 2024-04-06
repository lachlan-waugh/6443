from flask import Flask, render_template, request, make_response

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET', 'POST'])
def index():
    resp = make_response(
        render_template('index.html', query=request.args.get('q'))
    )

    resp.headers.set(
        'Content-Security-Policy',
        "script-src 'self' jokes.com:7031"
    )

    return resp


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=7030)
