const { product } = require("../../models/models-index");
const { __find_item } = require("../../utils/find-item");
const { insert_data } = require("../../utils/insert-data");
const { update_data } = require("../../utils/update-data");

const product_create = async (req, res) => {
  try {
    const { name, type, cost } = req.body;

    if (!name || !type || !cost || (!name && !type && !cost)) {
      res.status(400).json({ msg: "product name,cost and type required" });
    } else {
      if (product) product;
      insert_data("products", req.body);
      res.json({ msg: "product created" }).status(200);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const product_update = async (req, res) => {
  const { name, type, cost, id } = req.body;
  try {
    if (!name || !type || !cost || (!name && !type && !cost)) {
      res.status(400).json({ msg: "product name,cost and type required" });
    } else {
      const _product = await __find_item("products", {
        id: id,
      });

      if (_product == null) {
        res.status(400).json({ msg: "invalid id" });
      } else {
        update_data(
          "products",
          {
            name: name,
            type: type,
            cost: cost,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({ msg: "product updated" });
      }
    }
  } catch (error) {
    res.status(500).send("Internal Server Error"+error);
  }
};

const product_delete = async (req, res) => {
  const { product_isbn } = req.query;

  if (!product_isbn) res.json({ msg: "id required" });
  else {
    const _product = await __find_item("products", {
        id: product_isbn,
    });

    if (_product == null) {
      res.status(400).json({ msg: "invalid id" });
    } else {
      try {
        product.destroy({
          where: {
            id: product_isbn,
          },
        });
        res.json({ msg: "product deleted" }).status(200);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    }
  }
};

module.exports = {
  product_delete,
  product_create,
  product_update,
};
