// listen.js - Function which sets up the port for the server to listen on

const app = require("./app.js");

app.listen(9090, (err) => {
  if (err) throw err;
  console.log(`Server is now listening on port 9090...`);
});
