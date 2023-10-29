const { fetchUsers, fetchUserByUsername, createUser } = require('../models/users.models');

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
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUserDetails = req.body;

  createUser(newUserDetails)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
