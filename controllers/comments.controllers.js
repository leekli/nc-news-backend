const { removeCommentById } = require("../models/comments.models.js");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then((deletedComment) => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};
