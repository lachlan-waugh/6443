from flask import Flask, render_template, request, make_response

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        db.add_comment(request.form['comment'])

    query = request.args.get('q')
    resp = make_response(render_template('index.html', query=query))

    resp.headers.set('Content-Security-Policy', "script-src 'self' localhost:8000")
    return resp


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5001)
