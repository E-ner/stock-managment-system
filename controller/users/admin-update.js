const { user } = require("../../models/models-index");
const { hash } = require("../../utils/create-admin-user");
const { createToken } = require("../../utils/token-hashing");
const { update_data } = require("../../utils/update-data");

const adminUpdate = async (req, res) => {
  const { refreshToken, name, password } = req.body;
  const _user = await update_data(
    {
      name: name,
      password: await hash(password),
      refresToken:await createToken({user: name})
    },
    {
      where: {
        name: "admin",
      },
    }
  );

  res
  .status(401)
    .json({
      msg: "updated",
      refreshToken: refreshToken,
      currentToken: await createToken({ user: user }),
    })
};

module.exports = { adminUpdate };
