const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, updateOrderStatus, processPayment } = require("../controllers/orderController");

// ✅ Create Order
router.post("/", createOrder);

// ✅ Get Orders for a User
router.get("/:userId", getUserOrders);

// ✅ Update Order Status
router.put("/update", updateOrderStatus);

// ✅ Payment Route
router.post("/payment", processPayment);

module.exports = router;
