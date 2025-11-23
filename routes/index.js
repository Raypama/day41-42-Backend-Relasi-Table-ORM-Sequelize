const router = require("express").Router();

router.use("/products", require("./product.routes"));
router.use("/orders", require("./order.routes"));
router.use("/carts", require("./cart.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/shipments", require("./shipment.routes"));





module.exports = router;
