const db = require("../config/db");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    const sql = `
    INSERT INTO user (username, email, password) 
        VALUES(?, ?, ?);
    `;
    const [result] = await db.query(sql, [
      this.username,
      this.email,
      this.password,
    ]);
    return result.insertId;
  }

  static async findAll() {
    const sql = "SELECT * FROM user";

    const [rows] = await db.query(sql);

    return rows;
  }

  static async findOne(id) {
    const sql = `SELECT * FROM user WHERE id = ?`;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
  }
}

module.exports = User;
