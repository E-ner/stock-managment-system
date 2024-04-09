module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost:{
        type: Sequelize.INTEGER,
        defaultValue:0
    }
  });

  products.sync()
  return products;
};
