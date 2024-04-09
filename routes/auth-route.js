const express = require("express");
const { loginController } = require("../controller/users/login-controller");
const { refreshToken } = require("../controller/token-controller");
const { adminUpdate } = require("../controller/users/admin-update");
const { authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/login",loginController);
router.post("/admin/update",authMiddleware,adminUpdate)
router.post("/refresh-token",refreshToken)

module.exports = router;