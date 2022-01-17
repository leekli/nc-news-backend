const express = require("express");

const { getTopics } = require("./controllers/topics.controllers.js");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

// Initalise express server
const app = express();

// Use express.json() to deal with JSON in endpoint requests
app.use(express.json());

// GET request Endpoints
app.get("/api/topics", getTopics);

// Error handling - Error 404: Use app.all to capture all types of requests where the endpoint is invalid
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

// Error handling
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
