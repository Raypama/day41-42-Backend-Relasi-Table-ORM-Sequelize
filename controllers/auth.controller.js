exports.register = async (req, res) => {
  const { full_name, email, password } = req.body;

  // ini hanya dummy (belum simpan ke database)
  res.json({
    status: "success",
    message: "REGISTER endpoint working",
    data: { full_name, email },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // ini hanya dummy (belum validasi database)
  res.json({
    status: "success",
    message: "LOGIN endpoint working",
    data: { email },
  });
};

exports.me = async (req, res) => {
  // ini dummy USER DATA
  res.json({
    status: "success",
    message: "GET authenticated user (dummy)",
    data: {
      id: 1,
      full_name: "Dummy User",
      email: "dummy@example.com",
    },
  });
};