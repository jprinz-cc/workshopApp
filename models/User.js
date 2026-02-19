const db = require('../config/database');

const User = {
    getAllUsers: async function() {
        const [rows] = await db.query('SELECT * FROM users');
        if (rows.length <= 0){
            rows[0] = {"NoData": "true"};
        }
        return rows;
    },
    create: async function(name, email, password) {
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [name, email, password]);
        console.log("Result: ", result);
        return result;
    },
    findByEmail: async function(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(sql, [email]);
        return rows[0];
    }
};

module.exports = User;