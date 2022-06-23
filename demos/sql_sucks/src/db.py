from hashlib import sha256
from sqlite3 import connect # from pymysql import connect
import sys

# conn = connect(host='localhost', user='user', password='passwd', database='spaceships')
conn = connect('spaceships.db', check_same_thread=False)
curs = conn.cursor()

# I fixed up the database, so we're no longer vulnerable to SQL injection!!!
# (btw, there's legit no sqli for this chal :0)

def fetch(name):
    return curs.execute("SELECT name, capt FROM spaceships WHERE name = ?",
        (name,)).fetchone()

def check(name, pwrd):
    return curs.execute("SELECT * FROM spaceships WHERE name = ? AND pass = ?",
        (name, sha256(pwrd.encode('utf-8')).hexdigest())) != None

def add_ship(name, pwrd, capt):
    if (db.fetch(name)):
        return "Ship already exists >:("

    curs.execute("INSERT INTO `spaceships` VALUES (?, ?, ?)",
        (name, sha256(pwrd.encode('utf-8')).hexdigest(), capt))
    conn.commit()

    return "The mighty " + name + " has been added to the fleet!"

def get_ship(name, pwrd):
    if (check(name, pwrd)):
        ship = fetch(name)
        print(f"The mighty {ship[0]} is piloted by Captain {ship[1]}", file=sys.stderr)
        return f"The mighty {ship[0]} is piloted by Captain {ship[1]}"
    else:
        print("Auth failed, pew pew pew!", file=sys.stderr)
        return "Auth failed, pew pew pew!"

def list_ships():
    return [ship[0] for ship in curs.execute("SELECT name FROM spaceships LIMIT 5")]