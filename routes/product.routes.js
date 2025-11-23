// routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
// const auth = require("../middlewares/auth"); // kalau mau pake auth

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/",  productController.createProduct); 
router.put("/:id",  productController.updateProduct);
router.delete("/:id",  productController.deleteProduct);

module.exports = router;
