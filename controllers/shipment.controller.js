const shipmentService = require("../services/shipment.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllShipments: async (req, res) => {
    try {
      const shipments = await shipmentService.getAll();
      return successResponse(res, 200, "Shipments retrieved", shipments);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getShipmentById: async (req, res) => {
    try {
      const shipment = await shipmentService.getById(req.params.id);
      return successResponse(res, 200, "Shipment retrieved", shipment);
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  },

  createShipment: async (req, res) => {
    try {
      const shipment = await shipmentService.create(req.body);
      return successResponse(res, 201, "Shipment created", shipment);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updateShipment: async (req, res) => {
    try {
      const shipment = await shipmentService.update(req.params.id, req.body);
      return successResponse(res, 200, "Shipment updated", shipment);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  deleteShipment: async (req, res) => {
    const id = req.params.id;
    try {
      await shipmentService.delete(id);
      return successResponse(res, 200, `Shipment ${id} deleted successfully`);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },
};
