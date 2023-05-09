const cors = require("cors");
const express = require("express");
const apiRouter = require("./routers/app.router.js");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handle404s,
} = require("./errors/errors.js");

// Initalise Express server
const app = express();

// CORS Middleware
app.use(cors());

// JSON Middleware
app.use(express.json());

// Router Endpoints
app.use("/api", apiRouter);

// Error handling
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
