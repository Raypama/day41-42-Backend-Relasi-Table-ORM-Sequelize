// controllers/user.controller.js
const userService = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return successResponse(res, 200, "Success get users", users);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) return errorResponse(res, 404, "User not found");

      return successResponse(res, 200, "Success get user", user);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const data = req.body;
      const user = await userService.createUser(data);

      return successResponse(res, 201, "User created", user);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await userService.updateUser(id, data);

      if (!updated) return errorResponse(res, 404, "User not found");

      return successResponse(res, 200, "User updated", updated);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(id);

      if (!deleted) return errorResponse(res, 404, "User not found");

      return successResponse(res, 200, "User deleted");
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },
};
