const {
  removeCommentById,
  updateCommentById,
  fetchCommentById,
} = require("../models/comments.models.js");

const { checkExists } = require("../db/utils/utils.js");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  return checkExists("comments", "comment_id", comment_id)
    .then(() => {
      return removeCommentById(comment_id).then(() => {
        res.sendStatus(204);
      });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const commentBody = req.body;

  return checkExists("comments", "comment_id", comment_id)
    .then(() => {
      if (Object.keys(commentBody).length !== 0) {
        return updateCommentById(comment_id, commentBody).then((comment) => {
          res.status(200).send({ comment });
        });
      } else if (Object.keys(commentBody).length === 0) {
        return fetchCommentById(comment_id).then((comment) => {
          res.status(200).send({ comment });
        });
      }
    })
    .catch(next);
};
