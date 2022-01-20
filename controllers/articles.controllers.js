// controllers/articles.controllers.js - Controllers file for dealing with requests from the 'articles' Router and 'articles' data table

const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  addComment,
  addArticle,
  removeArticle,
} = require("../models/articles.models.js");

const {
  checkArticleExists,
  checkTopicExists,
  checkUserExists,
} = require("../db/utils/utils.js");

// getArticles function - Retrieves data from articles models file, and returns a status code of 200 and the data if successful
exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;

  if (topic === undefined && author === undefined) {
    fetchArticles(sort_by, order, topic, author)
      .then((allArticles) => {
        res.status(200).send({ articles: allArticles });
      })
      .catch((err) => {
        next(err);
      });
  } else if (topic !== undefined) {
    return checkTopicExists(topic)
      .then((topicExists) => {
        if (topicExists) {
          return fetchArticles(sort_by, order, topic, author).then(
            (allArticles) => {
              res.status(200).send({ articles: allArticles });
            }
          );
        } else {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else if (author !== undefined) {
    return checkUserExists(author)
      .then((userExists) => {
        if (userExists) {
          return fetchArticles(sort_by, order, topic, author).then(
            (allArticles) => {
              res.status(200).send({ articles: allArticles });
            }
          );
        } else {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
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

// postArticle function - Retrieves data from articles models file, and returns a status code of 201 and the data if successful
exports.postArticle = (req, res, next) => {
  const newArticle = req.body;

  addArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

// deleteArticleById function - Retrieves data from articles models file, and returns a status code of 204 if deletion was successful
exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return removeArticle(article_id).then((deletedArticle) => {
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
