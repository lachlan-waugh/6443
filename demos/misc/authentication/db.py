users = [
	{ 'username': 'user1', 'password': 'password' },
	{ 'username': 'melon', 'password': 'xd123' },
	{ 'username': 'admin', 'password': 'admin' }
]

def auth(username, password):
	print(username)
	print(password)
	for user in users:
		if user['username'] == username:
			if user['password'] == password:
				print(True)
				return True
			else:
				print(False)
				return False
	print(None)
	return None