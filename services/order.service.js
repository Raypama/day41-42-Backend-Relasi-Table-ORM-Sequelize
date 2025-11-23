const { Order } = require("../models");

class OrderService {
  async getAll() {
    return await Order.findAll();
  }

  async getById(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async create(data) {
    return await Order.create(data);
  }

  async update(id, data) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");

    await order.update(data);
    return order;
  }

  async delete(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");

    await order.destroy();
    return true;
  }
}

module.exports = new OrderService();
