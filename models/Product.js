module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(200), allowNull: false },
      description: DataTypes.TEXT,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      price: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      rating: { type: DataTypes.DECIMAL(3, 2), allowNull: true },
    },
    {
      tableName: "products",
      timestamps: true,
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Brand, { foreignKey: "brand_id", as: "brand" });
    Product.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
    Product.hasMany(models.ProductMedia, { foreignKey: "product_id", as: "media" });
    Product.hasMany(models.OrderItem, { foreignKey: "product_id", as: "order_items" });
    Product.hasMany(models.CartItem, { foreignKey: "product_id", as: "cart_items" });
  };

  return Product;
};
