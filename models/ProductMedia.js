module.exports = (sequelize, DataTypes) => {
  const ProductMedia = sequelize.define(
    "ProductMedia",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      media_type: DataTypes.STRING(20),
      url: DataTypes.TEXT,
    },
    {
      tableName: "product_media",
      timestamps: true,
      underscored: true,
    }
  );

  ProductMedia.associate = (models) => {
    ProductMedia.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  };

  return ProductMedia;
};
