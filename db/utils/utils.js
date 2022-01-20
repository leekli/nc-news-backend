// db/utils.js - Utilities file

const db = require("../connection.js");

// checkCommentExists Function - Conducts a check on the comments data table to check that the comment_id request, exists.
exports.checkCommentExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id=$1`, [comment_id])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

// checkArticleExists Function - Conducts a check on the articles data table to check that the article_id request, exists.
exports.checkArticleExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

// checkTopicExists Function - Conducts a check on the topics data table to check that the topic request, exists.
exports.checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug=$1`, [topic])
    .then(({ rows }) => {
      if (rows.length > 0) {
        return true;
      } else {
        return false;
      }
    });
};

// checkUserExists Function - Conducts a check on the users data table to check that the username request, exists.
exports.checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username=$1`, [username])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};
