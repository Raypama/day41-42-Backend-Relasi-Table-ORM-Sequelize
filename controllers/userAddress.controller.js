const userAddressService = require("../services/userAddress.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllAddresses: async (req, res) => {
    try {
      const data = await userAddressService.getAll();
      return successResponse(res, 200, "Addresses retrieved", data);
    } catch (err) {
      return errorResponse(res, 500, err.message);
    }
  },

  getAddressById: async (req, res) => {
    try {
      const data = await userAddressService.getById(req.params.id);
      return successResponse(res, 200, "Address retrieved", data);
    } catch (err) {
      return errorResponse(res, 404, err.message);
    }
  },

  createAddress: async (req, res) => {
    try {
      const data = await userAddressService.create(req.body);
      return successResponse(res, 201, "Address created", data);
    } catch (err) {
      return errorResponse(res, 400, err.message);
    }
  },

  updateAddress: async (req, res) => {
    try {
      const data = await userAddressService.update(req.params.id, req.body);
      return successResponse(res, 200, "Address updated", data);
    } catch (err) {
      return errorResponse(res, 400, err.message);
    }
  },

  deleteAddress: async (req, res) => {
    const id = req.params.id;
    try {
      await userAddressService.delete(id);
      return successResponse(res, 200, `Address ${id} deleted succesfull`);
    } catch (err) {
      return errorResponse(res, 400, err.message);
    }
  },
};
