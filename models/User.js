module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      full_name: { type: DataTypes.STRING(150), allowNull: true },
      nickname: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: DataTypes.STRING(255), allowNull: false },
      phone: DataTypes.STRING(20),
      profile_image: DataTypes.TEXT,
      birthday: DataTypes.DATEONLY,
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
    User.hasMany(models.Cart, { foreignKey: "user_id", as: "carts" });
    User.hasMany(models.UserAddress, { foreignKey: "user_id", as: "addresses" });
  };

  return User;
};
