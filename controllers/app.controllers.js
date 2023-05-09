const { fetchEndPoints } = require("../models/app.models.js");

exports.getEndpoints = (req, res, next) => {
  fetchEndPoints()
    .then((allEndPoints) => {
      res.status(200).send({ allEndPoints });
    })
    .catch((err) => {
      next(err);
    });
};
