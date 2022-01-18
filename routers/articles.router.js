const express = require("express");

const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("../controllers/articles.controllers.js");

const articlesRouter = express.Router();

// GET Requests
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);

// PATCH Requests
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
