const express = require('express');
const { getTopics, postTopic } = require('../controllers/topics.controllers');

const topicsRouter = express.Router();

// GET Requests
topicsRouter.get('/', getTopics);

// POST Requests
topicsRouter.post('/', postTopic);

module.exports = topicsRouter;
