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

exports.updateCommentById = (comment_id, commentToUpdate) => {
  const { inc_votes, body } = commentToUpdate;

  if (body === undefined) {
    return db
      .query(
        `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`,
        [inc_votes, comment_id]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else if (body !== undefined) {
    return db
      .query(
        `UPDATE comments SET body = $1 WHERE comment_id = $2 RETURNING *;`,
        [body, comment_id]
      )
      .then((result) => {
        return result.rows[0];
      });
  }
};

exports.fetchCommentById = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((result) => {
      return result.rows[0];
    });
};
