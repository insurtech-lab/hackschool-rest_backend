const path = require("path");
const fs = require("fs");

function getFilename() {
  return path.resolve(process.cwd(), "./db/orders.json");
}

function open() {
  const dataFilename = getFilename();
  if (!fs.existsSync(dataFilename)) {
    fs.writeFileSync(dataFilename, JSON.stringify({}));
  }
  const ordersJSON = fs.readFileSync(dataFilename);
  const ordersMap = JSON.parse(ordersJSON);
  return ordersMap;
}

function save(ordersMap) {
  const ordersJSON = JSON.stringify(ordersMap);
  const dataFilename = getFilename();
  fs.writeFileSync(dataFilename, ordersJSON);
}

exports.writeToFile = function(order) {
  const ordersMap = open();
  const { id } = order;
  ordersMap[id] = order;
  save(ordersMap);
  return order;
};

exports.findAll = function() {
  const ordersMap = open();
  const all = Object.values(ordersMap);
  return all;
};

exports.findById = function(id) {
  const ordersMap = open();
  return ordersMap[id];
};

exports.deleteById = function(id) {
  const ordersMap = open();
  delete ordersMap[id];
  save(ordersMap);
};
