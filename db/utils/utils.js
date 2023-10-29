const format = require('pg-format');
const db = require('../connection');

exports.checkUserExists = async (username) => {
  const queryStr = format('SELECT * FROM users WHERE username = $1;');
  const dbOutput = await db.query(queryStr, [username]);

  if (dbOutput.rowslnegth) {
    return true;
  }
  return false;
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
  const dbOutput = await db.query(queryStr, [value]);

  if (dbOutput.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Not found' });
  }
  return true;
};
