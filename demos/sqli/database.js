import sqlite from 'better-sqlite3';

const build_query = (query) => {

};

export const db_init = () => {
    db = sqlite(':memory:');

    db.exec(`
        CREATE TABLE users (
            id string primary key
            username string
            password string
        );

        INSERT INTO users (username, password) VALUES
        ('melon', 'hunter2'), ('web-admin', 'man_i_love_my_secure_app')
        ('admin', 'admin'), ('flag-haver', 'COMP6443{SUBMIT_ME_TO_CTFD}')
    `);

    return db;
};