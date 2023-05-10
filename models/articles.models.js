const db = require("../db/connection.js");

exports.fetchArticles = (
  sort_by = "created_at",
  order = "DESC",
  topic,
  author,
  search
) => {
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

  const allowedOrder = ["ASC", "DESC"];

  if (!allowedOrder.includes(order.toUpperCase())) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const queryValues = [];

  let queryStr =
    "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE topic = '${topic}' GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  } else if (author) {
    queryValues.push(topic);
    queryStr += ` WHERE articles.author = '${author}' GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  } else if (search) {
    queryValues.push(search);
    queryStr += ` WHERE articles.title ILIKE '%${search}%' GROUP BY articles.article_id;`;
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
      if (result.rows.length === 0)
        return Promise.reject({ status: 404, msg: "Not found" });
      else return result.rows[0];
    });
};

exports.updateArticleById = (article_id, articleToUpdate) => {
  const { inc_votes, body } = articleToUpdate;

  if (body === undefined) {
    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
        [inc_votes, article_id]
      )
      .then((result) => {
        return result.rows[0];
      });
  } else if (body !== undefined) {
    return db
      .query(
        `UPDATE articles SET body = $1 WHERE article_id = $2 RETURNING *;`,
        [body, article_id]
      )
      .then((result) => {
        return result.rows[0];
      });
  }
};

exports.fetchCommentsByArticleId = (article_id, sort_by = "votes") => {
  const allowedSortBys = ["votes", "created_at"];

  if (!allowedSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY ${sort_by} DESC;`,
      [article_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.addComment = (article_id, newComment) => {
  const { username, body } = newComment;

  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`,
      [username, body, article_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.addArticle = (newArticle) => {
  const { author, title, body, topic } = newArticle;

  return db
    .query(
      `INSERT INTO articles (title, topic, author, body) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, topic, author, body]
    )
    .then((result) => {
      const { article_id } = result.rows[0];

      return db.query(
        `SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
        [article_id]
      );
    })
    .then((result) => {
      return result.rows;
    });
};

exports.removeArticle = (article_id) => {
  return db
    .query(`DELETE FROM articles WHERE article_id = $1 RETURNING *;`, [
      article_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};
