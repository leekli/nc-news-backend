// listen.js - Function which sets up the port for the server to listen on

const app = require("./app.js");

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is now listening on port ${PORT}...`);
});
