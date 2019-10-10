import db from "../db/db.js";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// endpoints
app.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "get"
  });
});

// get all orders
app.get("/api/orders", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "all orders retrieved successfully",
    orders: db
  });
});

// get a specific order identified by id
app.get("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map(order => {
    if (order.id === id) {
      return res.status(200).send({
        success: "true",
        message: "order retrieved successfully",
        order
      });
    }
  });
  return res.status(404).send({
    success: "false",
    message: `order with id = ${id} does not exist`,
    orders: null
  });
});

// insert a new order to db
app.post("/api/orders", (req, res) => {
  // simple checks if req.body is not empty
  if (!req.body.name || !req.body.forename) {
    return res.status(400).send({
      success: "false",
      message: "name and/or forename is required"
    });
  } else if (!req.body.street || !req.body.zip || !req.body.town) {
    return res.status(400).send({
      success: "false",
      message: "a valid adress is required"
    });
  } else if (!req.body.position) {
    return res.status(400).send({
      success: "false",
      message: "a order item is required"
    });
  }
  // req.body is not empty, so execute post
  const temp_order = {
    id: db.length + 1,
    name: req.body.name,
    forename: req.body.forename,
    position: req.body.position,
    street: req.body.street,
    zip: req.body.zip,
    town: req.body.town
  };
  db.push(temp_order);
  return res.status(201).send({
    success: "false",
    message: "name and/or forename is required",
    temp_order
  });
});

// create server
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
