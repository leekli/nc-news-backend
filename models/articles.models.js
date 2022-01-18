const db = require("../db/connection.js");

exports.fetchArticles = (sort_by = "created_at", order = "DESC", topic) => {
  const allowedSortBys = [
    "title",
    "author",
    "article_id",
    "topic",
    "votes",
    "comment_count",
    "created_at",
  ];

  if (!allowedSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const allowedOrder = ["ASC", "DESC", "asc", "desc", "Asc", "Desc"];

  if (!allowedOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const queryValues = [];

  let queryStr =
    "SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE topic = '${topic}' GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  } else {
    queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  }

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateArticleById = (article_id, articleToUpdate) => {
  const { inc_votes } = articleToUpdate;

  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
