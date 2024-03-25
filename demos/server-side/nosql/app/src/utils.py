from pymongo_inmemory import MongoClient


class Database:
    def __init__(self):
        self.db = MongoClient()['db']
        # in memory as there's only one user lol
        self.db.users.insert_one({'username': 'admin', 'password': 'AR3@l1ystr0ngp@$Sw0rdthEyl1n3vergu3ssxd646464'})

    def auth(self, username, password):
        return (self.db.users.find_one({ 'username': username, 'password': password }) is not None)