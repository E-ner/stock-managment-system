const Sequelizer = require("sequelize");
const {
  db_user,
  db_name,
  db_password,
  db_host,
  db_dialect,
  db_pool,
} = require("../config/db-config");

const sequelizer = new Sequelizer(db_name, db_user, db_password, {
  host: db_host,
  dialect: db_dialect,
  pool: db_pool,
});

const db = {};
db.user = require("./user-model")(sequelizer, Sequelizer);
db.product = require("./product-model")(sequelizer, Sequelizer);
db.stock = require("./stock-model")(sequelizer, Sequelizer);
db.stock_in = require("./stock-in-model")(sequelizer, Sequelizer);
db.stock_out = require("./stock-out-model")(sequelizer, Sequelizer);
module.exports = db;
