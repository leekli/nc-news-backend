// controllers/comments.controllers.js - Controllers file for dealing with requests from the 'comments' Router and 'comments' data table

const {
  removeCommentById,
  updateCommentById,
  fetchCommentById,
} = require("../models/comments.models.js");

const { checkCommentExists } = require("../db/utils/utils.js");

// deleteCommentById function - Retrieves data from comments models file, and returns a status code of 204 and no data if successful to show delete request was successful
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  return checkCommentExists(comment_id)
    .then((commentExists) => {
      if (commentExists) {
        return removeCommentById(comment_id).then((deletedComment) => {
          res.status(204).send({});
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// patchCommentById function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const comment = req.body;

  return checkCommentExists(comment_id)
    .then((commentExists) => {
      if (commentExists) {
        if (Object.keys(comment).length !== 0) {
          return updateCommentById(comment_id, req.body).then(
            (updatedComment) => {
              res.status(200).send({ comment: updatedComment });
            }
          );
        } else if (Object.keys(comment).length === 0) {
          return fetchCommentById(comment_id).then((requestedComment) => {
            res.status(200).send({ comment: requestedComment });
          });
        }
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
