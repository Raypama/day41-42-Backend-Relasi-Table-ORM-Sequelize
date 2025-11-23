// controllers/product.controller.js
const productService = require("../services/product.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAll();
      return successResponse(res, 200, "Products retrieved", products);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productService.getById(req.params.id);
      return successResponse(res, 200, "Product retrieved", product);
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await productService.create(req.body);
      return successResponse(res, 201, "Product created", product);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await productService.update(req.params.id, req.body);
      return successResponse(res, 200, "Product updated", product);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  deleteProduct: async (req, res) => {
    const params = req.params.id
    try {
      await productService.delete(params);
      return successResponse(res, 200, `Product ${params} deleted succesfull `);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },
};
