const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user");

const sequelize = new Sequelize("node_fulltask", "root", "2357", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = UserModel(sequelize, DataTypes);

module.exports = db;
