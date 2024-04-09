const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const {
  stock_status,
  stock_in,
  stock_out,
  all_products,
  stock_status_by_id,
} = require("../controller/product-stock/stock-controller");

const router = express.Router();

router.get("/stock-status-all", authMiddleware, stock_status);
router.get("/stock-status-id", authMiddleware, stock_status_by_id);
router.post("/stock-in", authMiddleware, stock_in);
router.post("/stock-out", authMiddleware, stock_out);
router.get("/products-all",authMiddleware,all_products);

module.exports = router;
