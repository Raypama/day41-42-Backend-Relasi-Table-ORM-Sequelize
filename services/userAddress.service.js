const { UserAddress, User } = require("../models");

class UserAddressService {
  async getAll() {
    return await UserAddress.findAll({ include: ["user"] });
  }

  async getById(id) {
    const address = await UserAddress.findByPk(id, { include: ["user"] });
    if (!address) throw new Error("Address not found");
    return address;
  }

  async create(data) {
    return await UserAddress.create(data);
  }

  async update(id, data) {
    const address = await UserAddress.findByPk(id);
    if (!address) throw new Error("Address not found");

    await address.update(data);
    return address;
  }

  async delete(id) {
    const address = await UserAddress.findByPk(id);
    if (!address) throw new Error("Address not found");

    await address.destroy();
    return true;
  }
}

module.exports = new UserAddressService();
