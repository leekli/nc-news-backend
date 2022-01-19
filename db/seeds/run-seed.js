// db/seeds/run-seed.js - Script to seed the database each time its called

const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

// Function runSeed - seeds the database, passing the relevant data through set in 'dotenv'
const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
