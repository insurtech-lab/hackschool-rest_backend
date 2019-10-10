const express = require("express");
const endpoints = require("./endpoints.js");
const bodyParser = require("body-parser");
const errorHandler = require("./errorHandler.js");

const app = express();
const port = 8080;

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// endpoints
endpoints(app);

// create server
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
