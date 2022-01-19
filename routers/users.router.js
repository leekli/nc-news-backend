const express = require("express");

const {
  getUsers,
  getUserByUsername,
} = require("../controllers/users.controllers.js");

const usersRouter = express.Router();

// GET Requests
usersRouter.get("/", getUsers);
usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
