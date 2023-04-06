from flask import Flask, render_template, request, make_response
from flask_talisman import Talisman

app = Flask(
    __name__,
    static_folder='src/static',
    template_folder='src/templates',
    static_url_path=''
)
app.config['TITLE'] = 'Comments or somethn'

csp = {
    "object-src": "'none'",
    "base-uri": "'none'",
    "script-src": "'strict-dynamic' 'unsafe-eval' cdnjs.cloudflare.com"
}
Talisman(
    app,
    content_security_policy=csp,
    content_security_policy_nonce_in=["script-src"],
    force_https=False,
    strict_transport_security=False,
)


@app.route('/', methods=['GET'])
def home():
    return make_response(render_template('index.html', query=request.args.get('q')))


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)