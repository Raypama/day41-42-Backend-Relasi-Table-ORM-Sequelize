const User = require("../models/User");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require("../utils/response");


module.exports = {
  getAllUsers: async () => {
    return await User.findAll();
  },

  getUserById: async (id) => {
    return await User.findByPk(id);
  },

  createUser: async (req, res) => {
    try {
      const data = req.body;

      const user = await userService.createUser(data);

      return successResponse(res, 201, "Register success", {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      });
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    // Jika password di-update, hash ulang
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);
    return user;
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  },
};
