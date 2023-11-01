from flask import Flask, render_template, request, make_response
import db
import json

app = Flask(__name__)
app.config['TITLE'] = 'Comments or somethn'


@app.route('/jsonp')
def jsonp():
    headers = {"Content-Type": "application/javascript"}

    query = request.args.get('q', '')
    callback = request.args.get('callback', 'console.log')
    return f'{callback}({json.dumps(db.get_comments(query))});', 200, headers


@app.route('/')
def root():
    return json.dumps(db.get_comments()), 200


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000)
