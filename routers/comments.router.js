const express = require("express");

const {
  deleteCommentById,
  patchCommentById,
} = require("../controllers/comments.controllers");

const commentsRouter = express.Router();

// DELETE Requests
commentsRouter.delete("/:comment_id", deleteCommentById);

// PATCH Requests
commentsRouter.patch("/:comment_id", patchCommentById);

module.exports = commentsRouter;
