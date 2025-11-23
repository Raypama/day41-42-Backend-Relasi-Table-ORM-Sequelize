// controllers/payment.controller.js
const paymentService = require("../services/payment.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await paymentService.getAll();
      return successResponse(res, 200, "Payments retrieved", payments);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const payment = await paymentService.getById(req.params.id);
      return successResponse(res, 200, "Payment retrieved", payment);
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  },

  createPayment: async (req, res) => {
    try {
      const payment = await paymentService.create(req.body);
      return successResponse(res, 201, "Payment created", payment);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updatePayment: async (req, res) => {
    try {
      const payment = await paymentService.update(req.params.id, req.body);
      return successResponse(res, 200, "Payment updated", payment);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  deletePayment: async (req, res) => {
    try {
      await paymentService.delete(req.params.id);
      return successResponse(res, 200, `Payment ${req.params.id} deleted`);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },
};
