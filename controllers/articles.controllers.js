const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  addComment,
  addArticle,
  removeArticle,
} = require('../models/articles.models');

const { checkExists } = require('../db/utils/utils');

exports.getArticles = (req, res, next) => {
  const {
    topic, author, search, sort_by, order,
  } = req.query;

  if (!topic && !author) {
    fetchArticles(topic, author, search, sort_by, order)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else if (topic) {
    return checkExists('topics', 'slug', topic)
      .then(() => fetchArticles(topic, author, search, sort_by, order).then((articles) => {
        res.status(200).send({ articles });
      }))
      .catch(next);
  } else if (author) {
    return checkExists('users', 'username', author)
      .then(() => fetchArticles(topic, author, search, sort_by, order).then((articles) => {
        res.status(200).send({ articles });
      }))
      .catch(next);
  }

  return false;
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

  return checkExists('articles', 'article_id', article_id)
    .then(() => updateArticleById(article_id, articleBody).then((article) => {
      res.status(200).send({ article });
    }))
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;

  return checkExists('articles', 'article_id', article_id)
    .then(() => fetchCommentsByArticleId(article_id, sort_by).then((comments) => {
      res.status(200).send({ comments });
    }))
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const newComment = req.body;

  return checkExists('articles', 'article_id', article_id)
    .then(() => checkExists('users', 'username', username).then(() => addComment(article_id, newComment).then((comment) => {
      res.status(201).send({ comment });
    })))
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

  return checkExists('articles', 'article_id', article_id)
    .then(() => removeArticle(article_id).then(() => {
      res.sendStatus(204);
    }))
    .catch(next);
};
