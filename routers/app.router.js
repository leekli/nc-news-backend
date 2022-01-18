const express = require("express");
const topicsRouter = require("./topics.router.js");
const articlesRouter = require("./articles.router.js");

const apiRouter = express.Router();

// Topic routers
apiRouter.use("/topics", topicsRouter);

// Article routers
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
