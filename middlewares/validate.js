exports.validate = (rules) => {
  return (req, res, next) => {
    const errors = [];

    for (const rule of rules) {
      if (!req.body[rule]) {
        errors.push(`${rule} is required`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};