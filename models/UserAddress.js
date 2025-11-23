module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "UserAddress",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      label: DataTypes.STRING(50),
      recipient_name: DataTypes.STRING(150),
      phone: DataTypes.STRING(20),
      address_line: DataTypes.TEXT,
      city: DataTypes.STRING(100),
      province: DataTypes.STRING(100),
      postal_code: DataTypes.STRING(10),
      is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "user_addresses",
      timestamps: true,
      underscored: true,
    }
  );

  UserAddress.associate = (models) => {
    UserAddress.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return UserAddress;
};
