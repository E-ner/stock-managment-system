const { product, stock_out, stock, stock_in } = require("../models/models-index")

const insert_data = (table,options) => {
    if (table === "products") {
        const products = product.create(options);
        return products;
    }
    if (table === "stock_in") {
        const _stock_in = stock_in.create(options);
        return _stock_in;
    }
    if (table === "stock_out") {
        const _stock_out = stock_out.create(options);
        return _stock_out;   
    }
    if (table === "stock") {
        const _stock = stock.create(options);
        return _stock;
    }
}

module.exports = { insert_data }