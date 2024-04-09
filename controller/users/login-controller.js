const { user } = require("../../models/models-index");
const { __find_item } = require("../../utils/find-item");
const { bcryptCompare, createToken } = require("../../utils/token-hashing");

const loginController = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password || (!name && !password))
    res.status(400).json({ msg: "name and password required" });
  else {
    const _user = await __find_item("users",{ name:name })

    if (_user == null) {
      res.status(401).json({ msg: "usernotfound" });
    } else {
      const hash_compare_result = await bcryptCompare(
        password,
        _user.dataValues.password
      );

      if (hash_compare_result) {
        const refreshToken = _user.dataValues.refreshToken;
        const customToken = await createToken({ user: name });
        res
         .status(200)
          .json({
            msg: "authenticated",
            __data: _user.dataValues,
            __token: customToken,
            refreshToken: refreshToken,
          })
      } else {
        res.status(401).json({ msg: "unothorized" });
      }
    }
  }
};

module.exports = { loginController };
