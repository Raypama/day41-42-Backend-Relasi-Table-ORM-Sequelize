module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define(
    "Shipment",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      courier: DataTypes.STRING(50),
      tracking_number: DataTypes.STRING(100),
      status: DataTypes.STRING(20),
      shipped_at: DataTypes.DATE,
      delivered_at: DataTypes.DATE,
    },
    {
      tableName: "shipments",
      timestamps: false,//next dibuat true saat semua sudah pake data real
      underscored: true,
    }
  );

  Shipment.associate = (models) => {
    Shipment.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
  };

  return Shipment;
};
