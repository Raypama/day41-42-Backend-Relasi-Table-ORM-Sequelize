
// backend/middlewares/auth.js

exports.requireAuth = (req, res, next) => {
  // Dummy auth (belum pakai JWT)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized. Token is required.",
    });
  }

  // Kamu bisa decode token disini nanti
  req.user = { id: 1, full_name: "Dummy Auth User" };

  next();
};