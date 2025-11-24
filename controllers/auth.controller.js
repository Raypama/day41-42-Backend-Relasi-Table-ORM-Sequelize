const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      return successResponse(res, 200, "Login success", result);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  },

  check: async (req, res) => {
    try {
      const result = await authService.checkToken(req.user.id);
      return successResponse(res, 200, "Token valid", result);
    } catch (error) {
      return errorResponse(res, 401, error.message);
    }
  },
};
