const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class authService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid email or password");
    }

    const payload = { id: user.id, email: user.email };

    // 🔥 JWT 2 jam
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return {
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        nickname: user.nickname,
        profile_image: user.profile_image,
      },
      token,
    };
  }
   // 🔥🔥🔥 NEW: CHECK TOKEN
  async checkToken(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      nickname: user.nickname,
      profile_image: user.profile_image,
      phone: user.phone,
      birthday: user.birthday,
    };
  }
}

module.exports = new authService();
