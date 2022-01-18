const express = require("express");

const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controllers.js");

const articlesRouter = express.Router();

// GET Requests
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);

// PATCH Requests
articlesRouter.patch("/:article_id", patchArticleById);

// POST Requests
articlesRouter.post("/:article_id/comments", postCommentByArticleId);

module.exports = articlesRouter;
