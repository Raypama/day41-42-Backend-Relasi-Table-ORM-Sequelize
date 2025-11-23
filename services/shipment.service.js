const { Shipment } = require("../models");

class ShipmentService {
  async getAll() {
    return await Shipment.findAll();
  }

  async getById(id) {
    const shipment = await Shipment.findByPk(id);
    if (!shipment) throw new Error("Shipment not found");
    return shipment;
  }

  async create(data) {
    return await Shipment.create(data);
  }

  async update(id, data) {
    const shipment = await Shipment.findByPk(id);
    if (!shipment) throw new Error("Shipment not found");

    await shipment.update(data);
    return shipment;
  }

  async delete(id) {
    const shipment = await Shipment.findByPk(id);
    if (!shipment) throw new Error("Shipment not found");

    await shipment.destroy();
    return true;
  }
}

module.exports = new ShipmentService();
