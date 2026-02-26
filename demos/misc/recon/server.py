from flask import Flask, jsonify, render_template, request
import subprocess

app = Flask(__name__)

SECLISTS='/usr/share/seclists/Discovery/Web-Content/raft-small-words.txt'

out, err = subprocess.Popen([f'shuf', '-n', '25', SECLISTS],
   stdout=subprocess.PIPE,
   stderr=subprocess.PIPE,
   text=True
).communicate() # Use text=True for string output (Python 3)
ENDPOINT_NAMES = out.splitlines()

def create_view_func(name, index):
    def view_func():
        status_code = 403 if (index + 1) % 4 == 0 else 200
        return jsonify({
            "status": "OK",
            "endpoint": name,
            "code": status_code
        }), status_code

    view_func.__name__ = f"func_{name}"
    return view_func

for i, name in enumerate(ENDPOINT_NAMES):
    path = f"/api/{name}"
    app.add_url_rule(
        path,
        endpoint=name,
        view_func=create_view_func(name, i)
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("index.html")
    return jsonify({"status": "OK", "message": "Authentication successful"}), 200

# --- GLOBAL ERROR HANDLER ---
@app.errorhandler(404)
def not_found(e):
    return jsonify({"status": "Error", "message": "Endpoint not found"}), 404

if __name__ == '__main__':
    for name in ENDPOINT_NAMES:
        print(f"Registered: /api/{name}")

    app.run(debug=True, port=5000)
