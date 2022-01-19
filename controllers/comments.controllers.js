// controllers/comments.controllers.js - Controllers file for dealing with requests from the 'comments' Router and 'comments' data table

const { removeCommentById } = require("../models/comments.models.js");
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
