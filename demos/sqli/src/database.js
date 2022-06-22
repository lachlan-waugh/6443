import sqlite from 'better-sqlite3';

let db;

const db_init = () => {
    const db = sqlite(':memory:');

    db.exec(`
    CREATE TABLE users (
        id integer primary key,
        username string,
        password string
    );

    INSERT INTO users (username, password) VALUES
        ('melon', 'hunter2'), ('web-admin', 'man_i_love_my_secure_app'),
        ('admin', 'admin'), ('flag-haver', 'COMP6443{I_AM_BIGAPP_7}')
    `);

    db.exec(`
    CREATE TABLE blogs (
        id integer primary key,
        title string,
        text string
    );

    INSERT INTO blogs (title, text) VALUES
    ('abcd', 'abcd'), ('abcd', 'abcd'), ('abcd', 'abcd'),
    ('abcd', 'abcd'), ('abcd', 'abcd'), ('abcd', 'abcd')
    `);

    return db;
};

const execute = (query, quiet=true) => {
    if (!db) db = db_init();

    try {
        console.log(query);

        result = db.prepare(query).get();
        console.log(result);
        if (result) return JSON.stringify( { status: 'success', data: result } )
    } catch (e) {
        console.warn(`ERROR: ${e.toString()}`)
        if (!quiet) return JSON.stringify( { status: 'failure', data: e.toString() } )
    }

    return JSON.stringify({ status: 'failure', data: "Incorrect username or password" });
};

export default execute;
