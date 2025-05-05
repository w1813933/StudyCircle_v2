const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);
});

const Note = {
    findByUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM notes WHERE user_id = ?`,
                [userId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    },

    create: ({ userId, title, date, description }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO notes (user_id, title, date, description) VALUES (?, ?, ?, ?)`,
                [userId, title, date, description],
                function (err) {
                    if (err) reject(err);
                    else resolve({
                        id: this.lastID,
                        userId,
                        title,
                        date,
                        description
                    });
                }
            );
        });
    },

    update: (id, { title, date, description }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE notes SET title = ?, date = ?, description = ? WHERE id = ?`,
                [title, date, description, id],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM notes WHERE id = ?`,
                [id],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }
};

module.exports = Note;