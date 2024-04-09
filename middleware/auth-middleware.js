const { verifyToken } = require("../utils/token-hashing");

const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");

  const verify_token = await verifyToken(token);

  if (verify_token == null) {
    res.status(401).json({ msg: "token expired" });
  } else {
    next();
  }
};

module.exports = { authMiddleware };
