from flask import Flask, render_template, request, make_response
import db

app = Flask(__name__)
app.config['TITLE'] = 'Comments or somethn'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        comment = request.form['comment']
        db.add_comment(comment)

    query = request.args.get('q')
    return render_template('index.html', comments=db.get_comments(query), query=query)

@app.route('/csp', methods=['GET'])
def csp():
    query = request.args.get('q')
    res = make_response(render_template('index.html', comments=db.get_comments(query), query=query))
    res.headers.set('Content-Security-Policy', "script-src 'self'")
    return res

@app.route('/js/<req>')
def req(req):
    return make_response(render_template('script.js', name=req))

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)