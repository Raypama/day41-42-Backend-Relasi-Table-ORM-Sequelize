module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      product_name_snapshot: DataTypes.STRING(200),
      price_snapshot: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    {
      tableName: "order_items",
      timestamps: true,
      underscored: true,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    OrderItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  };

  return OrderItem;
};
