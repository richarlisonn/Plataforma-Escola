const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        attachment TEXT
    )`);
});

module.exports = db;
