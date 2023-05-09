// Function to seed the database, using postgres-node and pg-format

const db = require("../connection.js");
const format = require("pg-format");

const {
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  formatCommentsData,
} = require("../utils/seed-formatting.js");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  // Drop tables if they exist
  return (
    db
      .query(`DROP TABLE IF EXISTS comments;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS articles;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS topics;`);
      })

      // Create the 4 tables
      .then(() => {
        return db.query(`
      CREATE TABLE topics (
        slug TEXT NOT NULL,
        description TEXT,
        PRIMARY KEY(slug)
      );`);
      })
      .then(() => {
        return db.query(`
      CREATE TABLE users (
        username TEXT NOT NULL,
        name TEXT NOT NULL,
        avatar_url TEXT,
        PRIMARY KEY(username)
      );`);
      })
      .then(() => {
        return db.query(`
      CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        topic TEXT REFERENCES topics(slug),
        author TEXT REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        votes INT DEFAULT 0 NOT NULL
      );`);
      })
      .then(() => {
        return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        author TEXT REFERENCES users(username) NOT NULL,
        article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
      })

      // Seed the 4 tables with data
      .then(() => {
        const formattedTopics = formatTopicsData(topicData);
        const sqlString = format(
          `INSERT INTO topics (description, slug) VALUES %L RETURNING *;`,
          formattedTopics
        );
        return db.query(sqlString);
      })
      .then(() => {
        const formattedUsers = formatUsersData(userData);
        const sqlString = format(
          `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
          formattedUsers
        );
        return db.query(sqlString);
      })
      .then(() => {
        const formattedArticles = formatArticlesData(articleData);
        const sqlString = format(
          `INSERT INTO articles (title, topic, author, body, created_at, votes) VALUES %L RETURNING *;`,
          formattedArticles
        );
        return db.query(sqlString);
      })
      .then(() => {
        const formattedComments = formatCommentsData(commentData);
        const sqlString = format(
          `INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L RETURNING *;`,
          formattedComments
        );
        return db.query(sqlString);
      })
  );
};

module.exports = seed;
