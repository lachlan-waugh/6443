from sqlite3 import connect

def execute(query, parameters):
	conn = connect('users.db')
	curs = conn.cursor()
	curs.execute(query, parameters)
	conn.commit()
	return curs

def authorize(username, password):
	try:
		if (get_user(username)):
			return (execute('SELECT username FROM users WHERE username = ? AND password = ?', (username, password)).fetchone() != None)
		# if the user doesn't exist, just create it for them
		else:
			execute('INSERT INTO users (username, password, balance, has_flag) VALUES (?, ?, 500, FALSE)', (username, password))
			return True
	except Exception as e:
		print(e)
		return None

def get_user(username):
	try:
		account = execute('SELECT username, balance, has_flag FROM users WHERE username = ?', (username,)).fetchone()
		if (account):
			return account
		else:
			return None
	except Exception as e:
		print(e)
		return None

def send_funds(src, dst, amount):
	if (src == 'admin'):
		execute('UPDATE users SET has_flag = TRUE WHERE username = ?', (dst,))
		return True
	else:
		return False

def disable_flag(username):
	try:
		execute('UPDATE users SET has_flag = FALSE WHERE username = ?', (username,))
		return True
	except Exception as e:
		print(e)
		return None
