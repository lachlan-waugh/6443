users = [
	{ 'username': 'user1', 'password': 'password' },
	{ 'username': 'melon', 'password': 'xd123' },
	{ 'username': 'admin', 'password': 'admin' }
]

def auth(username, password):
	for user in users:
		if user['username'] == username:
			if user['password'] == password:
				return True
			else:
				return False
	return None