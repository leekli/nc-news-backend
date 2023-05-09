const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((res) => {
    return res.rows;
  });
};

exports.addTopic = (newTopic) => {
  const { slug, description } = newTopic;

  return db
    .query(
      `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;`,
      [slug, description]
    )
    .then((result) => {
      return result.rows;
    });
};
