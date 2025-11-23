require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");  // <--- WAJIB

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("DB connected!");

    await sequelize.sync();
    console.log("DB synced!");

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

startServer();
