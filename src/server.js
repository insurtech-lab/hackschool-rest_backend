import db from "../db/db.js";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

//routes
app.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "get"
  });
});

app.get("/api/orders", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "all orders retrieved successfully",
    orders: db
  });
});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
