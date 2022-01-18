const express = require("express");

const { getArticleById } = require("../controllers/articles.controllers.js");

const articlesRouter = express.Router();

articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;
