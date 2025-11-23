module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      provider: DataTypes.STRING(50),
      status: DataTypes.STRING(20),
      transaction_id: DataTypes.STRING(100),
      amount: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      paid_at: DataTypes.DATE,
    },
    {
      tableName: "payments",
      timestamps: false,
      underscored: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
  };

  return Payment;
};
