const express = require('express');

const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  postArticle,
  deleteArticleById,
} = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

// GET Requests
articlesRouter.get('/', getArticles);
articlesRouter.get('/:article_id', getArticleById);
articlesRouter.get('/:article_id/comments', getCommentsByArticleId);

// PATCH Requests
articlesRouter.patch('/:article_id', patchArticleById);

// POST Requests
articlesRouter.post('/', postArticle);
articlesRouter.post('/:article_id/comments', postCommentByArticleId);

// DELETE Requests
articlesRouter.delete('/:article_id', deleteArticleById);

module.exports = articlesRouter;
