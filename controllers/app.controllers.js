const { fetchEndPoints } = require("../models/app.models.js");

exports.getEndpoints = (req, res, next) => {
  fetchEndPoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
