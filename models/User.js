const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email  TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`
    );
});

const User = {
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    },

    create: ({ name, email, password}) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
                [name, email, password],
                function (err) {
                    if (err) return reject(err);
                    resolve();
                        
                    
                }
            );
        });
    },

    updatePassword: (email, newPassword) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET password = ? WHERE email = ?`,
                [newPassword, email],
                function (err) {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    },
    
};

module.exports = User;