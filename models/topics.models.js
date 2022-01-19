// models/topics.models.js - Models file for dealing with requests from topics.controllers.js

const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((res) => {
    return res.rows;
  });
};
