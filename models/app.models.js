// models/app.models.js - Models file for dealing with requests from app.controllers.js

const db = require("../db/connection.js");
const fs = require("fs/promises");

exports.fetchEndPoints = () => {
  return fs
    .readFile("./endpoints.json", "utf8")
    .then((data) => {
      const endpoints = JSON.parse(data);
      return endpoints;
    })
    .catch((err) => {
      console.log("File does not exist!", err);
    });
};
