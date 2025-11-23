module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING(20), defaultValue: "pending" },
      total_amount: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      shipping_cost: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      payment_method: DataTypes.STRING(50),
    },
    {
      tableName: "orders",
      timestamps: true,
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "items" });
    Order.hasOne(models.Payment, { foreignKey: "order_id", as: "payment" });
    Order.hasOne(models.Shipment, { foreignKey: "order_id", as: "shipment" });
  };

  return Order;
};
