module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      slug: DataTypes.STRING(120),
    },
    {
      tableName: "brands",
      timestamps: true,
      underscored: true,
    }
  );

  Brand.associate = (models) => {
    Brand.hasMany(models.Product, { foreignKey: "brand_id", as: "products" });
  };

  return Brand;
};
