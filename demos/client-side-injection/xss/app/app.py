from flask import Flask, render_template, request
import db

app = Flask(
    __name__,
    static_folder='static',
    static_url_path=''
)
app.config['TITLE'] = 'Comments or somethn'


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        db.add_comment(request.form['comment'])

    query = request.args.get('q')
    return render_template('index.html', comments=db.get_comments(query), query=query)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
