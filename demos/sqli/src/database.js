import sqlite from 'better-sqlite3';

let db;

const db_init = () => {
    db = sqlite(':memory:');

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

    // db.exec(`
    // CREATE TABLE blogs (
    //     id integer primary key,
    //     title string,
    //     text string
    // );

    // INSERT INTO blogs (title, text) VALUES
    // ('abcd', 'abcd'), ('abcd', 'abcd'), ('abcd', 'abcd'),
    // ('abcd', 'abcd'), ('abcd', 'abcd'), ('abcd', 'abcd')
    // `);
};

const execute = (query, quiet=true) => {
    db || db_init();

    try {
        const result = db.prepare(query).get();
        if (result) return { success: true, data: result };
    } catch (e) {
        console.warn(`ERROR: ${e.toString()}`);
        if (!quiet) return { success: false, data: e.toString() };
    }

    return { success: false, data: "Incorrect username or password" };
};

export default execute;
