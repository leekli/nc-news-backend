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

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, author, search } = req.query;

  if (topic === undefined && author === undefined) {
    fetchArticles(sort_by, order, topic, author, search)
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
          return fetchArticles(sort_by, order, topic, author, search).then(
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
          return fetchArticles(sort_by, order, topic, author, search).then(
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

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      if (article) {
        res.status(200).send({ article: article });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const article = req.body;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        if (Object.keys(article).length !== 0) {
          return updateArticleById(article_id, article).then(
            (updatedArticle) => {
              res.status(200).send({ article: updatedArticle });
            }
          );
        } else if (Object.keys(article).length === 0) {
          return fetchArticleById(article_id).then((requestedArticle) => {
            if (requestedArticle) {
              res.status(200).send({ article: requestedArticle });
            } else {
              return Promise.reject({ status: 404, msg: "Not found" });
            }
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

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return fetchCommentsByArticleId(article_id, sort_by).then(
          (comments) => {
            res.status(200).send({ comments: comments });
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

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const newComment = req.body;

  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        if (username === undefined || body === undefined) {
          return Promise.reject({ status: 400, msg: "Bad request" });
        } else {
          return checkUserExists(username).then((userExists) => {
            if (userExists) {
              return addComment(article_id, newComment).then((newComment) => {
                res.status(201).send({ comment: newComment });
              });
            } else {
              return Promise.reject({ status: 404, msg: "Not found" });
            }
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
