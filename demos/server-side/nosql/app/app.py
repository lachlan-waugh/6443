from flask import Flask
from src.views import views
from src.utils import Database


app = Flask(
    __name__,
    template_folder='src/templates',
    static_folder='src/static',
    static_url_path=''
)
app.register_blueprint(views)


@app.before_first_request
def init():
    if 'DATABASE' not in app.config:
        app.config['DATABASE'] = Database()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)