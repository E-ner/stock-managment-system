const { user } = require("../models/models-index");
const { createToken } = require("../utils/token-hashing");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if(!refreshToken) res.status(400).json({msg:"refresh token required"})
  else{
    const _user = await user.findOne({
        where: {
          refresToken: refreshToken,
        },
      });
    
      if (_user == null) {
        res.status(401).json({ msg: "token not found" });
      } 
      else {
        const token = await createToken({ user:_user.dataValues.name });
        res.json({ _data:_user.dataValues,msg:"tokenrefreshed",_token:token })
      }
  }
};

module.exports= {refreshToken}
