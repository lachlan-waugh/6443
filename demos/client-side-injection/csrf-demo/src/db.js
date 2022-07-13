const db = [
	{ username: 'melon', password: 'password', balance: 500 },
	{ username: 'admin', password: 'admin', balance: 500 }
];

const check_login = (username, password) => {
    if (!username) return { success: false, error: 'Username is required.' };
	if (!password) return { success: false, error: 'Password is required.' };

	const user = db.filter((account) =>
        account.username === username && account.password === password)[0];

	return (user)
        ? { success: true, user: user }
        : { success: false, error: 'Invalid username or password.' };
}

const get_account = (username) => {
	if (!username) return { success: false, error: '\'username\' is empty.' };
	
	const user = db.filter((a) => a.username === username)[0]
	return (user)
		? { success: true, user: user }
		: { success: false, error: `user \'${username}\' does not exist` };
};

const send_funds = (src, dest, amount) => {
	src_acc = get_account(src)
	dst_acc = get_account(dest);
	
	if (!src_acc.success)	return { success: false, msg: src_acc.msg };
	if (!dst_acc.success) 	return { success: false, msg: dst_acc.msg };
	if (!amount) 			return { success: false, msg: '\'Amount\' cannot be empty.' };

	src_acc.balance += amount;
	dst_acc.balance -= amount;

	return { success: true };
};

exports.check_login = check_login;
exports.get_account = get_account;
exports.send_funds = send_funds;