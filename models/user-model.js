module.exports = (sequelize, Sequelizer) => {
  const user = sequelize.define("users", {
    name: {
      type: Sequelizer.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelizer.TEXT,
      allowNull: false,
    },
    refresToken: {
      type: Sequelizer.TEXT,
      allowNull: false,
    },
    type:{
      type:Sequelizer.STRING,
    }
  });

  user.sync()
  return user;
};
