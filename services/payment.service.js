// services/payment.service.js
const { Payment } = require("../models");

class PaymentService {
  async getAll() {
    return await Payment.findAll();
  }

  async getById(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    return payment;
  }

  async create(data) {
    return await Payment.create(data);
  }

  async update(id, data) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");

    await payment.update(data);
    return payment;
  }

  async delete(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");

    await payment.destroy();
    return true;
  }
}

module.exports = new PaymentService();
