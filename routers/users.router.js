const express = require("express");

const {
  getUsers,
  getUserByUsername,
  postUser,
} = require("../controllers/users.controllers.js");

const usersRouter = express.Router();

// GET Requests
usersRouter.get("/", getUsers);
usersRouter.get("/:username", getUserByUsername);

// POST Requests
usersRouter.post("/", postUser);

module.exports = usersRouter;
