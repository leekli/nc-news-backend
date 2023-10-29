const db = require('../db/connection');

exports.removeCommentById = (comment_id) => db
  .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
  .then((result) => result.rows[0]);

exports.updateCommentById = (comment_id, commentToUpdate) => {
  const { inc_votes, body } = commentToUpdate;

  if (body === undefined) {
    return db
      .query('UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;', [
        inc_votes,
        comment_id,
      ])
      .then((result) => result.rows[0]);
  }
  if (body !== undefined) {
    return db
      .query('UPDATE comments SET body = $1 WHERE comment_id = $2 RETURNING *;', [body, comment_id])
      .then((result) => result.rows[0]);
  }

  return false;
};

exports.fetchCommentById = (comment_id) => db
  .query('SELECT * FROM comments WHERE comment_id = $1;', [comment_id])
  .then((result) => result.rows[0]);
