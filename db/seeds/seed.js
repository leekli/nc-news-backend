const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS articles;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
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
        topic TEXT,
        author TEXT,
        body TEXT,
        created_at DATE DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body TEXT,
        votes INT DEFAULT 0,
        author TEXT,
        article_id INT,
        created_at DATE DEFAULT CURRENT_TIMESTAMP
      );`);
    });
};

module.exports = seed;
