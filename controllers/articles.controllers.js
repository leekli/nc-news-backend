const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  addComment,
  addArticle,
  removeArticle,
} = require("../models/articles.models.js");

const { checkExists } = require("../db/utils/utils.js");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, author, search } = req.query;

  if (!topic && !author) {
    fetchArticles(sort_by, order, topic, author, search)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else if (topic) {
    return checkExists("topics", "slug", topic)
      .then(() => {
        return fetchArticles(sort_by, order, topic, author, search).then(
          (articles) => {
            res.status(200).send({ articles });
          }
        );
      })
      .catch(next);
  } else if (author) {
    return checkExists("users", "username", author)
      .then(() => {
        return fetchArticles(sort_by, order, topic, author, search).then(
          (articles) => {
            res.status(200).send({ articles });
          }
        );
      })
      .catch(next);
  }
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const articleBody = req.body;

  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return updateArticleById(article_id, articleBody).then((article) => {
        res.status(200).send({ article });
      });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;

  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return fetchCommentsByArticleId(article_id, sort_by).then((comments) => {
        res.status(200).send({ comments });
      });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const newComment = req.body;

  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return checkExists("users", "username", username).then(() => {
        return addComment(article_id, newComment).then((comment) => {
          res.status(201).send({ comment });
        });
      });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;

  addArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;

  return checkExists("articles", "article_id", article_id)
    .then(() => {
      return removeArticle(article_id).then(() => {
        res.sendStatus(204);
      });
    })
    .catch(next);
};
