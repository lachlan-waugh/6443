from flask import Flask, render_template, request, make_response
import db

app = Flask(__name__)
app.config['TITLE'] = 'Comments or somethn'

# wait a second, what was the DRY principle again?? :shrug:

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        db.add_comment(request.form['comment'])

    comments, query = db.get_comments(request.args.get('q'))
    return render_template('index.html', comments=comments, query=query, escape=False)

@app.route('/escape', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        db.add_comment(request.form['comment'])

    comments, query = db.get_comments(request.args.get('q'))
    return render_template('index.html', comments=comments, query=query, escape=True)

@app.route('/csp', methods=['GET', 'POST'])
    if request.method == 'POST':
        db.add_comment(request.form['comment'])

    comments, query = db.get_comments(request.args.get('q'))
    res = make_response(render_template('index.html', comments=comments, query=query, escape=True))
    res.headers.set('Content-Security-Policy', "script-src 'none'")
    return r

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)