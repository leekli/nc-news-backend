const fs = require("fs/promises");

exports.fetchEndPoints = () => {
  return fs
    .readFile("./endpoints.json", "utf8")
    .then((fileContents) => {
      const endPointsJson = JSON.parse(fileContents);
      return endPointsJson;
    })
    .catch((err) => {
      throw new Error("File does not exist", err);
    });
};
