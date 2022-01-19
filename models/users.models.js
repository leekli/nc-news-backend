// models/users.models.js - Models file for dealing with requests from users.controllers.js

const db = require("../db/connection.js");

exports.fetchUsers = () => {
  return db.query(`SELECT username FROM users;`).then((result) => {
    return result.rows;
  });
};

exports.fetchUserByUsername = (username) => {
  return db
    .query(`SELECT username, avatar_url, name FROM users WHERE username = $1`, [
      username,
    ])
    .then((result) => {
      return result.rows[0];
    });
};
