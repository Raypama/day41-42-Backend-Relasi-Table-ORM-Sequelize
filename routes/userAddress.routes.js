const express = require("express");
const router = express.Router();
const userAddressController = require("../controllers/userAddress.controller");

router.get("/", userAddressController.getAllAddresses);
router.get("/:id", userAddressController.getAddressById);
router.post("/", userAddressController.createAddress);
router.put("/:id", userAddressController.updateAddress);
router.delete("/:id", userAddressController.deleteAddress);

module.exports = router;
