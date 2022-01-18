const express = require("express");
const topicsRouter = require("./topics.router.js");
const articlesRouter = require("./articles.router.js");
const commentsRouter = require("./comments.router.js");

const { getEndpoints } = require("../controllers/app.controllers.js");

const apiRouter = express.Router();

// Topics router
apiRouter.use("/topics", topicsRouter);

// Articles router
apiRouter.use("/articles", articlesRouter);

// Comments router
apiRouter.use("/comments", commentsRouter);

// GET Request to /api
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
