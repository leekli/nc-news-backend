// controllers/users.controllers.js - Controllers file for dealing with requests from the 'users' Router and 'users' data table

const { checkUserExists } = require("../db/utils/utils.js");

const {
  fetchUsers,
  fetchUserByUsername,
  createUser,
} = require("../models/users.models.js");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((allUsers) => {
      res.status(200).send({ users: allUsers });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  return checkUserExists(username)
    .then((userExists) => {
      if (userExists) {
        return fetchUserByUsername(username).then((user) => {
          res.status(200).send({ user: user });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const newUserDetails = req.body;
  const { username } = req.body;

  return checkUserExists(username)
    .then((userExists) => {
      if (!userExists) {
        return createUser(newUserDetails).then((newUser) => {
          res.status(201).send({ user: newUser });
        });
      } else {
        return Promise.reject({ status: 403, msg: "Already exists" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
