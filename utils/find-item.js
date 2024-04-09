const {
  user,
  product,
  stock,
  stock_in,
  stock_out,
} = require("../models/models-index");

const __find_item = (table_name, option, find_all_or_by_id) => {
  if (table_name == "users") {
    const user_name = user.findOne({
      where: option,
    });

    return user_name;
  }
  if (table_name === "products") {
    const _product = product.findOne({
      where:option,
    });

    return _product;
  }
  if (table_name === "stock") {
    const _stock = stock.findOne({
        where:option,
    });

    return _stock;
  }
  if (table_name === "stock_in" && find_all_or_by_id == "") {
    const _stock_in = stock_in.findOne({
      where:option,
    });

    return _stock_in;
  }
  if (table_name === "stock_out" && find_all_or_by_id == "") {
    const _stock_out = stock_out.findOne({
      where:option,
    });

    return _stock_out;
  }

  if (table_name === "stock_out" && find_all_or_by_id == "by id") {
    const _stock_out = stock_out.findAll({
        where:option,
      });
  
      return _stock_out;
  }
  if (table_name === "stock_in" && find_all_or_by_id == "by id") {
    const _stock_in = stock_in.findAll({
        where:option,
      });
  
      return _stock_in;
  }
};

module.exports = { __find_item };
