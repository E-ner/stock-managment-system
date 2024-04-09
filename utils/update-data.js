const { product, user, stock } = require("../models/models-index");

const update_data = (table, options, whereClause) => {
  if (table === "products") {
    const products = product.update(options, whereClause);
    return products;
  }

  if (table === "users") {
    const users = user.update(options, whereClause);
    return users;
  }
  if (table === "stock") {
    const _stock = stock.update(options, whereClause);
    return _stock;
  }
};

module.exports = { update_data };
