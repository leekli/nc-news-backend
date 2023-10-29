const express = require('express');
const topicsRouter = require('./topics.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const usersRouter = require('./users.router');

const { getEndpoints } = require('../controllers/app.controllers');

const apiRouter = express.Router();

// Topics router
apiRouter.use('/topics', topicsRouter);

// Articles router
apiRouter.use('/articles', articlesRouter);

// Comments router
apiRouter.use('/comments', commentsRouter);

// Users router
apiRouter.use('/users', usersRouter);

// GET Request to /api
apiRouter.get('/', getEndpoints);

module.exports = apiRouter;
