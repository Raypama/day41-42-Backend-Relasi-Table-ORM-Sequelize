const orderService = require("../services/order.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderService.getAll();
      return successResponse(res, 200, "Orders retrieved", orders);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await orderService.getById(req.params.id);
      return successResponse(res, 200, "Order retrieved", order);
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  },

  createOrder: async (req, res) => {
    try {
      const order = await orderService.create(req.body);
      return successResponse(res, 201, "Order created", order);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await orderService.update(req.params.id, req.body);
      return successResponse(res, 200, "Order updated", order);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  deleteOrder: async (req, res) => {
    const id = req.params.id;
    try {
      await orderService.delete(id);
      return successResponse(res, 200, `Order ${id} deleted successfully`);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },
};
