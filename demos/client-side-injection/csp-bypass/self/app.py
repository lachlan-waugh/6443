from flask import Flask, render_template, request, make_response

app = Flask(
    __name__,
    static_folder='src/static',
    template_folder='src/templates',
    static_url_path=''
)
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET'])
def home():
    res = make_response(render_template('index.html', query=request.args.get('q')))
    res.headers.set('Content-Security-Policy', "script-src 'self'")
    return res


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)