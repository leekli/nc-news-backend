const express = require("express");
const { getTopics } = require("../controllers/topics.controllers.js");

const topicsRouter = express.Router();

// GET Requests
topicsRouter.get("/", getTopics);

module.exports = topicsRouter;
