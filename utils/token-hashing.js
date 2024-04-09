const { __jwtk } = require("../config/app-config");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const createToken = async (payload) => {
  const jwtoken = await jwt.sign(payload, __jwtk, {
    expiresIn: '20m',
  });

  return jwtoken;
};

const bcryptCompare = (data, _hashed) => {
  return bcrypt.compareSync(data, _hashed);
};

const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token,__jwtk);
    return payload;
  } catch (error) {
    if (typeof error == jwt.TokenExpiredError) {
      return 0;
    }
  }
}

module.exports = {
  verifyToken,
  bcryptCompare,
  createToken
}