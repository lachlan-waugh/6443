import sqlite from 'better-sqlite3';
import { redBright } from 'chalk';

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

const createQuery = (positions, ...vars) => {
    let query = "";
    let fmtQuery = "";
    for (let i = 0; i < positions.length || i < vars.length; ++i) {
        positions[i] && (fmtQuery += (query += positions[i]) && positions[i]);
        vars[i] && (fmtQuery += redBright((query += vars[i]) && vars[i]));
    }
    
    console.info("\n" + [Array(query.length + 7).fill('-').join(""), "query> " + fmtQuery].join("\n"));
    return query;
}


const execute = (query, quiet=false) => {
    db || db_init();

    console.log(query);
    console.log(createQuery(query));

    try {
        const result = db.prepare(createQuery(query)).get();
        if (result) return { success: true, data: result };
    } catch (e) {
        console.warn(`ERROR: ${e.toString()}`);
        if (!quiet) return { success: false, data: e.toString() };
    }

    return { success: false, data: "Incorrect username or password" };
};

export default execute;
