// controllers/app.controllers.js - Controllers file for dealing with requests from the 'api' Router

const { fetchEndPoints } = require("../models/app.models.js");

// getEndpoints function - Retrieves data from app models file, and returns a status code of 200 and the data if successful
exports.getEndpoints = (req, res, next) => {
  fetchEndPoints()
    .then((allEndPoints) => {
      res.status(200).send({ allEndPoints });
    })
    .catch((err) => {
      next(err);
    });
};
