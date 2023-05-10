const db = require("../connection.js");
const format = require("pg-format");

exports.checkCommentExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id=$1`, [comment_id])
    .then(({ rows }) => {
      if (rows.length) return true;
      else return false;
    });
};

exports.checkArticleExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
      if (rows.length) return true;
      else return false;
    });
};

exports.checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug=$1`, [topic])
    .then(({ rows }) => {
      if (rows.length > 0) return true;
      else return false;
    });
};

exports.checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username=$1`, [username])
    .then(({ rows }) => {
      if (rows.length) return true;
      else return false;
    });
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
  const dbOutput = await db.query(queryStr, [value]);

  if (dbOutput.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  } else {
    return true;
  }
};
