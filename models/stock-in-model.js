module.exports = (sequelize, Sequelize) => {
  const stock_in = sequelize.define("stock_ins", {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete:"CASCADE"
    },
  });

  stock_in.sync();
  return stock_in;
};
