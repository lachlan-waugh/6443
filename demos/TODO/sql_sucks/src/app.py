from flask import Flask, render_template, request, redirect
from db import add_ship, get_ship, list_ships
import sys

app = Flask(
    __name__,
    template_folder="templates", static_folder="static", static_url_path=''
)

@app.route("/", methods=["GET"])
def main():
    return "You aren't authorized!!"

@app.route("/adm1n-p@n3I", methods=["GET"])
def admin():
    return render_template("main.html")

@app.route("/mario", methods=["GET"])
def mario():
    return redirect("https://www.youtube.com/watch?v=rYduGCniLu0", code=302)

@app.route("/add-ship", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        name = request.form['name']
        pwrd = request.form['pwrd']
        capt = request.form['capt']
        return render_template("add.html", success=add_ship(name, pwrd, capt))
    else:
        return render_template("add.html")

@app.route("/get-ship", methods=["GET", "POST"])
def get():
    if request.method == "POST":
        print(f'{request.form["name"]}', file=sys.stderr)
        name = request.form['name']
        pwrd = request.form['pwrd']
        print(f'{name} {pwrd}', file=sys.stderr)
        return render_template("ship.html", ship=get_ship(name, pwrd))
    else:
        return render_template("ship.html")

@app.route("/list-ships", methods=["GET"])
def slist():
    return render_template("ships.html", ships=list_ships())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)