const express = require("express");

const { getTopics } = require("./controllers/topics.controllers.js");

// Initalise express server
const app = express();

// Use express.json() to deal with JSON in endpoint requests
app.use(express.json());

// GET request Endpoints
app.get("/api/topics", getTopics);

// Error handling 1 - Error 404: Use app.all to capture all types of requests where the endpoint is invalid
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

// Error handling 2 - Error 400: If PSQL hits error code "22P02"
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

// Error handling 3 - Dealing with errors by return status code
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// Error handling 4 - Any other error not accounted for above, return a Status error 500
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
