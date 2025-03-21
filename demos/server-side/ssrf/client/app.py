import requests, uuid
from flask import Flask, render_template, request, Response, redirect, flash

app = Flask(
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path=''
)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')

    image_url = request.form.get('url')
    if not image_url:
        print('no image')
        return render_template('index.html', error='No image provided')
    if not image_url.startswith('http'):
        print('base64 image')
        return render_template('index.html', error='We don\'t support base64 images yet')

    image_id = uuid.uuid4()
    print(image_id)
    image = requests.get(image_url)
    if ('html' in image.headers['content-type']):
        return render_template('index.html', error='ERROR: not a valid image!!\n' + image.content.decode())

    with open(f'client/static/img/{image_id}.png', 'wb+') as f:
        f.write(image.content)

    return render_template('index.html', file=image_id)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
