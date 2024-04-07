from flask import Flask, render_template, request, make_response, send_from_directory, redirect
import os

app = Flask(__name__, static_url_path='')
app.config['TITLE'] = 'Comments or somethn'
app.config['UPLOADS'] = './uploads'


def upload_pic(image):
    image.seek(0)  # Move cursor back to beginning so we can write to disk
    image.save(os.path.join(app.config['UPLOADS'], image.filename))


@app.route('/', methods=['GET'])
def root():
    query = request.args.get('q')
    res = make_response(render_template('index.html', query=query))
    res.headers.set(
        'Content-Security-Policy',
        "script-src 'self'"
    )
    return res


@app.route('/upload', methods=['POST'])
def upload():
    upload_pic(request.files.get("file"))
    return redirect('/')


@app.route('/uploads/<path:filename>')
def files(filename):
    return send_from_directory(app.config['UPLOADS'], filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
