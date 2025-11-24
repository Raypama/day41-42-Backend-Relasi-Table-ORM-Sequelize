const { User, UserAddress } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

class UserService {
  async getAll() {
    return await User.findAll({
      include: [{ model: UserAddress, as: "addresses" }],
    });
  }

  async getById(id) {
    const user = await User.findByPk(id, {
      include: [{ model: UserAddress, as: "addresses" }],
    });

    if (!user) throw new Error("User not found");
    return user;
  }

  async create(data) {
    const { nickname, email, password } = data;

    // ================================
    // VALIDASI WAJIB DIISI
    // ================================
    if (!nickname || !email || !password) {
      throw new Error("nickname, email, dan password wajib diisi");
    }

    // ================================
    // VALIDASI NICKNAME UNIK
    // ================================
    const existingNickname = await User.findOne({ where: { nickname } });
    if (existingNickname) {
      throw new Error("Nickname sudah digunakan");
    }

    // ================================
    // VALIDASI EMAIL FORMAT
    // ================================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Format email tidak valid");
    }

    // ================================
    // VALIDASI EMAIL UNIK
    // ================================
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      throw new Error("Email sudah digunakan");
    }

    // ================================
    // VALIDASI PASSWORD (Kapital awal, angka, simbol)
    // ================================
    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[\W_]).{7,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password harus dimulai huruf kapital, mengandung angka, simbol, dan minimal 8 karakter"
      );
    }

    // ================================
    // HASH PASSWORD (sesuai format kamu)
    // ================================
    data.password = await bcrypt.hash(password, 10);

    // ================================
    // GENERATE AVATAR OTOMATIS
    // ================================
    const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(
      nickname
    )}`;
    data.profile_image = avatarUrl;

    // ================================
    // CREATE USER (tetap sesuai format kamu)
    // ================================
    return await User.create(data);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    const { nickname, email, password, phone } = data;

    // ================================
    // VALIDASI WAJIB DIISI
    // ================================
    if (!nickname || !email) {
      throw new Error("nickname dan email wajib diisi");
    }

// ================================
    // VALIDASI DUPLIKAT NICKNAME
    // ================================
    if (nickname) {
      const existingNickname = await User.findOne({
        where: {
          nickname,
          id: { [Op.ne]: id }, // selain user ini
        },
      });
      if (existingNickname) {
        throw new Error("Nickname already use");
      }
    }

    // ================================
    // VALIDASI DUPLIKAT EMAIL
    // ================================
    if (email) {
      const existingEmail = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: id },
        },
      });
      if (existingEmail) {
        throw new Error("Email already use");
      }
    }

    // ================================
    // VALIDASI DUPLIKAT PHONE (opsional)
    // ================================
    if (phone) {
      const existingPhone = await User.findOne({
        where: {
          phone,
          id: { [Op.ne]: id },
        },
      });
      if (existingPhone) {
        throw new Error("Phone already use");
      }
    }

    // ================================
    // CEK PHONE SUDAH DIPAKAI USER LAIN
    // ================================
    if (phone) {
      const existingPhone = await User.findOne({
        where: { phone, id: { [Op.ne]: id } }, // tidak boleh duplikat oleh user lain
      });

      if (existingPhone) {
        throw new Error("Phone already use");
      }
    }

    // HASH PASSWORD JIKA DIKIRIM
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
