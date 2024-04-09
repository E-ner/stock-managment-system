module.exports = (sequelize, Sequelize) => {
  const stock = sequelize.define("stocks", {
    current_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
  });

  stock.sync();
  return stock;
};
