const { __find_item } = require("../../utils/find-item");
const { get_all_items } = require("../../utils/get-all");
const { insert_data } = require("../../utils/insert-data");
const { update_data } = require("../../utils/update-data");

//stocking in the product

const stock_in = async (req, res) => {
  const { prod_ssn, quantity } = req.body;

  try {
    if (!prod_ssn || !quantity || (!prod_ssn && !quantity)) {
      res.status(400).json({ msg: "product ssn and quantity required" });
    } else {
      const _product = await __find_item("products", {
        id: prod_ssn,
      });

      if (_product == null) {
        res.status(400).json({ msg: "product not found" });
      } else {
        insert_data("stock_in", { product_id: prod_ssn, quantity: quantity });
        const stock = await __find_item(
          "stock",
          {
            product_id: prod_ssn,
          },
          ""
        );

        if (stock == null) {
          insert_data("stock", {
            product_id: prod_ssn,
            current_quantity: quantity,
          });
          res.status(200).json({ msg: "created" });
        } else {
          update_data(
            "stock",
            {
              current_quantity: quantity + stock.dataValues.current_quantity,
            },
            { where: { product_id: prod_ssn } }
          );
          const _stock = await get_all_items("stock");
          res.status(200).json({ _data: _stock, msg: "created" });
        }
      }
    }
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};

// Stocking out the product

const stock_out = async (req, res) => {
  const { prod_ssn, quantity } = req.body;

  try {
    if (!prod_ssn || !quantity || (!prod_ssn && !quantity)) {
      res.status(400).json({ msg: "product ssn and quantity required" });
    } else {
      const _product = await __find_item("products", {
        id: prod_ssn,
      });

      if (_product == null) {
        res.status(400).json({ msg: "product not found" });
      } else {
        insert_data("stock_out", { product_id: prod_ssn, quantity: quantity });
        const stock = await __find_item("stock", {
          product_id: prod_ssn,
        });
        if (stock == null) {
          insert_data("stock", {
            product_id: prod_ssn,
            current_quantity: quantity,
          });
          res.status(200).json({ msg: "found" });
        } else {
          let current_qty = stock.dataValues.current_quantity - quantity;
          if (current_qty < 0) {
            current_qty = 0;
            update_data(
              "stock",
              {
                current_quantity: current_qty,
              },
              { where: { product_id: prod_ssn } }
            );
            const _stock = await get_all_items("stock");
            res.status(200).json({ _data: _stock, msg: "found" });
          } else {
            update_data(
              "stock",
              {
                current_quantity: stock.dataValues.current_quantity - quantity,
              },
              { where: { product_id: prod_ssn } }
            );
            const _stock = await get_all_items("stock");
            res.status(200).json({ _data: _stock, msg: "found" });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//Stock status

const stock_status = async (req, res) => {
  const stock_in = await get_all_items("stock_in");
  const stock_out = await get_all_items("stock_out");
  const stock = await get_all_items("stock");

  res.json({ stock: stock, stockOut: stock_out, stockIn: stock_in });
};

// Stock status by id
const stock_status_by_id = async (req, res) => {
  const { product_ssn } = req.query;
  const stock_in = await __find_item(
    "stock_in",
    { product_id: product_ssn },
    "by id"
  );
  const stock_out = await __find_item(
    "stock_out",
    { product_id: product_ssn },
    "by id"
  );
  const stock = await __find_item("stock", { product_id: product_ssn });

  res.json({ stock: stock, stockOut: stock_out, stockIn: stock_in });
};

const all_products = (req, res) => {};
module.exports = {
  stock_in,
  stock_out,
  stock_status,
  all_products,
  stock_status_by_id,
};
