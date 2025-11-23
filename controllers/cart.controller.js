const { Cart, CartItem, Product } = require("../models");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getAllCarts: async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [
        {
          model: CartItem,
          as: "items",
          include: [{ model: Product, as: "product" }]
        }
      ]
    });

    return successResponse(res, 200, "All carts retrieved", carts);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
},
  // ================================
  // GET CART BY USER
  // ================================
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;

      const cart = await Cart.findOne({
        where: { user_id: userId },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [{ model: Product, as: "product" }],
          },
        ],
      });

      return successResponse(res, 200, "Cart retrieved", cart || {});
    } catch (err) {
      return errorResponse(res, 500, err.message);
    }
  },

  // ================================
  // ADD ITEM TO CART
  // ================================
  addToCart: async (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;

      // 1. Check or create cart
      let cart = await Cart.findOne({ where: { user_id } });
      if (!cart) {
        cart = await Cart.create({ user_id });
      }

      // 2. Check if item already in cart
      let item = await CartItem.findOne({
        where: { cart_id: cart.id, product_id },
      });

      if (item) {
        // update qty
        item.quantity += quantity;
        await item.save();
      } else {
        item = await CartItem.create({
          cart_id: cart.id,
          product_id,
          quantity,
        });
      }

      return successResponse(res, 200, "Item added to cart", item);
    } catch (err) {
      return errorResponse(res, 500, err.message);
    }
  },

  // ================================
  // UPDATE CART ITEM QTY
  // ================================
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const item = await CartItem.findByPk(id);
      if (!item) return errorResponse(res, 404, "Item not found");

      item.quantity = quantity;
      await item.save();

      return successResponse(res, 200, "Item updated", item);
    } catch (err) {
      return errorResponse(res, 500, err.message);
    }
  },

  // ================================
// DELETE CART ITEM
// ================================
deleteItem: async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CartItem.findByPk(id, {
      include: [
        { model: Product, as: 'product' },
        { model: Cart, as: 'cart' }
      ]
    });

    if (!item) return errorResponse(res, 404, "Item not found");

    const deletedData = item; // simpan data sebelum delete

    await item.destroy();

    return successResponse(res, 200, "Item deleted", deletedData);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
},

  // ================================
// CLEAR CART
// ================================
clearCart: async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { user_id: userId }
    });

    if (!cart) return errorResponse(res, 404, "Cart not found");

    // ambil semua item sebelum dihapus
    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product, as: 'product' }]
    });

    await CartItem.destroy({ where: { cart_id: cart.id } });

    return successResponse(res, 200, "Cart cleared", items);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}
};
