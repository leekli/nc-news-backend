// app.js - File which sets up the Express server, and Express routers and error handling

const express = require("express");
const apiRouter = require("./routers/app.router.js");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handle404s,
} = require("./errors/errors.js");

// Initalise express server
const app = express();

// Use express.json() to deal with JSON in endpoint requests
app.use(express.json());

// Router Endpoints
app.use("/api", apiRouter);

// Error handling
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
