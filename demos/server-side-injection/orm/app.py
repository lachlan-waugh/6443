from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.orm import joinedload

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    age = db.Column(db.Integer)
    is_admin = db.Column(db.Boolean, default=False)
    balance = db.Column(db.Float, default=0.0)

@app.before_request
def create_tables():
    db.create_all()
    for user in [
        {'name': 'test', 'age': 123},
        {'name': 'guest', 'age': 456},
        {'name': 'admin', 'age': 0},
    ]:
        db.session.add(user)
    db.session.commit()

@app.route("/")
def index():
    return render_template("index.html")

# SQL Injection
@app.route("/sqli", methods=["GET", "POST"])
def sql_injection():
    result = []
    if request.method == "POST":
        user_input = request.form.get("id")
        query = f"SELECT * FROM user WHERE id = {user_input}"
        result = db.session.execute(text(query)).fetchall()

    return render_template("sqli.html", users=result)

# Mass Assignment
@app.route("/ma", methods=["GET", "POST"])
def mass_assignment():
    if request.method == "POST":
        user_data = request.form.to_dict()
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
    return render_template("mass.html")

if __name__ == "__main__":
    app.run(debug=True)
