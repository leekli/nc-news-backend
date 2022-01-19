// models/comments.models.js - Models file for dealing with requests from comments.controllers.js

const db = require("../db/connection.js");

exports.removeCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};
