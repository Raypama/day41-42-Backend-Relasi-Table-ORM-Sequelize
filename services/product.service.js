// services/product.service.js
const { Product } = require("../models");


class ProductService {
  async getAll() {
    return await Product.findAll();
  }

  async getById(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.update(data);
    return product;
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();
    return true;
  }
}

module.exports = new ProductService();
