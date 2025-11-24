const userService = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAll();
      return successResponse(res, 200, "Users retrieved", users);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getById(req.params.id);
      return successResponse(res, 200, "User retrieved", user);
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await userService.create(req.body);
      return successResponse(res, 201, "User created", user);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      return successResponse(res, 200, "User updated", user);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;

    try {
      await userService.delete(id);
      return successResponse(res, 200, `User ${id} deleted succesfull`);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },
};
