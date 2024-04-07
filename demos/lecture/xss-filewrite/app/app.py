from flask import Flask, render_template, request, make_response
import db

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET'])
def root():
    query = request.args.get('q')
    res = make_response(
        render_template('index.html', comments=db.get_comments(query), query=query)
    )
    res.headers.set(
        'Content-Security-Policy',
        "script-src 'self'"
    )
    return res


@app.route('/js/<query>')
def js(query):
    return make_response(render_template('script.js', query=query))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
