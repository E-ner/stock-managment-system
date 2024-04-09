const { admin_user, admin_password } = require("../config/app-config");
const { user } = require("../models/models-index");
const bcrypt = require("bcrypt");
const { createToken } = require("./token-hashing");
require("../config/dotenv.config");


const createAdmin = async () => {

  if(user) user
  const _user = await user.findOne({
    where: {
      name: admin_user,
    },
  });

  if (_user == null) {
    const hashed_pwd = await hash(admin_password);

    const refreshToken = await createToken({
      user: admin_user,
    });
      user.create({
      name: admin_user,
      password: hashed_pwd,
      refresToken: refreshToken,
      type: "admin",
    });
  } else {
    return;
  }
};

const hash = (password) => {
  const salt = 10;
  const the_hash = bcrypt.hash(password, salt);
  return the_hash;
};

module.exports = { createAdmin,hash };
