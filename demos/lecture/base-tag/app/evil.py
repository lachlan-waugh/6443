from flask import Flask

app = Flask(__name__)


@app.route('/evil.js', methods=['GET'])
def evil():
    return 'alert("surprised if you can get this")'


@app.route('/idk.js', methods=['GET'])
def home():
    return 'alert("you have been hacked!!1");'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7010)
