import db from "../db/db.js";
import { writeToFile } from "./utils.js";
const utils = require("./utils.js");

// eports endpoints for server.js
module.exports = function(app) {
  // endpoints
  app.get("/", (req, res) => {
    res.status(200).send({
      success: "true",
      code: "200",
      message: "a test get with no orders sent",
      orders: null
    });
  });

  // get all orders
  app.get("/api/orders", (req, res) => {
    res.status(200).send({
      success: "true",
      code: "200",
      message: "all orders retrieved successfully",
      orders: utils.findAll()
    });
  });

  // get a specific order identified by id
  app.get("/api/orders/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const order = utils.findById(id);

    // check if a order was found, if no return error
    if (!order) {
      return res.status(404).send({
        success: "false",
        code: "404",
        message: `order with id = ${id} does not exist`,
        orders: null
      });
    }

    res.json(order);
  });

  // insert a new order to db
  app.post("/api/orders", (req, res) => {
    // simple checks if req.body is not empty
    if (!req.body.name || !req.body.forename) {
      return res.status(400).send({
        success: "false",
        code: "400",
        message: "name and/or forename is required"
      });
    } else if (!req.body.street || !req.body.zip || !req.body.town) {
      return res.status(400).send({
        success: "false",
        code: "400",
        message: "a valid adress is required"
      });
    } else if (!req.body.position) {
      return res.status(400).send({
        success: "false",
        code: "400",
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
    //db.push(temp_order); // temp pushed
    // fs write
    writeToFile(temp_order);
    return res.status(201).send({
      success: "true",
      message: "order inserted successfully",
      temp_order
    });
  });

  app.delete("/api/orders/:id", (req, res) => {
    const toBeDeleted = utils.findById(req.params.id);
    utils.deleteById(req.params.id); // delete order with id
    res.json(toBeDeleted);
  });
};
