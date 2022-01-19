// controllers/topics.controllers.js - Controllers file for dealing with requests from the 'topics' Router and 'topics' data table

const { fetchTopics, addTopic } = require("../models/topics.models.js");

// getTopics function - Retrieves data from topics models file, and returns a status code of 200 and the data if successful
exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
};

// postTopic function - Retrieves data from topics models file, and returns a status code of 201 and the data if successful
exports.postTopic = (req, res, next) => {
  const newTopic = req.body;

  addTopic(newTopic)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};
