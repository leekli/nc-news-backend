const { checkUserExists, checkExists } = require("../db/utils/utils.js");

const {
  fetchUsers,
  fetchUserByUsername,
  createUser,
} = require("../models/users.models.js");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
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
    .catch(next);
};
