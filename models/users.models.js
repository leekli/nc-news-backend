const db = require('../db/connection');

exports.fetchUsers = () => db.query('SELECT * FROM users;').then((result) => result.rows);

exports.fetchUserByUsername = (username) => db
  .query('SELECT username, avatar_url, name FROM users WHERE username = $1', [username])
  .then((result) => {
    if (result.rows.length === 0) return Promise.reject({ status: 404, msg: 'Not found' });
    return result.rows[0];
  });

exports.createUser = (newUserDetails) => {
  const { username, name, avatar_url } = newUserDetails;

  return db
    .query('INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *;', [
      username,
      name,
      avatar_url,
    ])
    .then((result) => result.rows);
};
