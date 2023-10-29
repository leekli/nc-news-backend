const { removeCommentById, updateCommentById } = require('../models/comments.models');

const { checkExists } = require('../db/utils/utils');

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  return checkExists('comments', 'comment_id', comment_id)
    .then(() => removeCommentById(comment_id).then(() => {
      res.sendStatus(204);
    }))
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const commentBody = req.body;

  return checkExists('comments', 'comment_id', comment_id)
    .then(() => updateCommentById(comment_id, commentBody).then((comment) => {
      res.status(200).send({ comment });
    }))
    .catch(next);
};
