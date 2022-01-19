// controllers/articles.controllers.js - Controllers file for dealing with requests from the 'articles' Router and 'articles' data table

const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  addComment,
} = require("../models/articles.models.js");

const { checkArticleExists } = require("../db/utils/utils.js");

// getArticles function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  fetchArticles(sort_by, order, topic)
    .then((allArticles) => {
      res.status(200).send({ articles: allArticles });
    })
    .catch((err) => {
      next(err);
    });
};

// getArticleById function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((requestedArticle) => {
      if (requestedArticle) {
        res.status(200).send({ article: requestedArticle });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// patchArticleById function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return updateArticleById(article_id, req.body).then(
          (updatedArticle) => {
            res.status(200).send({ article: updatedArticle });
          }
        );
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// getCommentsByArticleId function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return fetchCommentsByArticleId(article_id).then((comments) => {
          res.status(200).send({ comments: comments });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// postCommentByArticleId function - Retrieves data from articles models file, and returns a status code of 201 and the data if successful
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return addComment(article_id, newComment).then((newComment) => {
          res.status(201).send({ newComment });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
