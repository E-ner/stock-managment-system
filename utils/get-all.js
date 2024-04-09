const { product, stock_out, stock, stock_in } = require("../models/models-index")

const get_all_items = (table) => {
    if (table === "products") {
        const products = product.findAll();
        return products;
    }
    if (table === "stock_in") {
        const _stock_in = stock_in.findAll();
        return _stock_in;
    }
    if (table === "stock_out") {
        const _stock_out = stock_out.findAll();
        return _stock_out;   
    }
    if (table === "stock") {
        const _stock = stock.findAll();
        return _stock;
    }
}

module.exports = { get_all_items }