const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

//
// GET semua cart (dev only)
router.get("/", cartController.getAllCarts);

// Add item to cart
router.post("/add", cartController.addToCart);

// Update quantity
router.put("/item/:id", cartController.updateItem);

// Delete item
router.delete("/item/:id", cartController.deleteItem);

// Clear entire cart
router.delete("/clear/:userId", cartController.clearCart);

// GET cart by user
router.get("/:userId", cartController.getCart);

module.exports = router;
