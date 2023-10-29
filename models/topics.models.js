const db = require('../db/connection');

exports.fetchTopics = () => db.query('SELECT * FROM topics;').then((res) => res.rows);

exports.addTopic = (newTopic) => {
  const { slug, description } = newTopic;

  return db
    .query('INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;', [
      slug,
      description,
    ])
    .then((result) => result.rows);
};
