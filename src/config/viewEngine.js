const path = require("path");

const viewEngine = (app) => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
};

module.exports = viewEngine;
