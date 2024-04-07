from flask import Flask, render_template, request
import db

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET'])
def root():
    query = request.args.get('q', '')
    for bad in ['<script>', '</script>', '<SCRIPT>', '</SCRIPT>']:
        query = query.replace(bad, '')

    return render_template(
        'index.html',
        comments=db.get_comments(query),
        query=query
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
