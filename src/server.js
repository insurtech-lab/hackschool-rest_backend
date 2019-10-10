const express = require("express");
const endpoints = require("./endpoints.js");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// endpoints
endpoints(app);

// create server
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
