const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const { product_create, product_update, product_delete } = require("../controller/product-stock/product-controller");

const router = express.Router();

router.post("/product-create",authMiddleware,product_create);
router.post("/product-update",authMiddleware,product_update)
router.get("/product-delete",authMiddleware,product_delete)

module.exports = router;