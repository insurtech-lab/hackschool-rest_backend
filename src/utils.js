const path = require("path");
const fs = require("fs");

function getFilename() {
  return path.resolve(process.cwd(), "/../db/db.js");
}

function open() {
  const dataFilename = getFilename();
  if (!fs.existsSync(dataFilename)) {
    fs.writeFileSync(dataFilename, JSON.stringify({}));
  }
  const ordersJSON = fs.readFileSync(dataFilename);
  return JSON.parse(ordersJSON);
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
