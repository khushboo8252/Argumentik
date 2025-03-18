const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, updateOrderStatus } = require("../controllers/orderController");

// ✅ Create Order
router.post("/", createOrder);

// ✅ Get Orders for a User
router.get("/:userId", getUserOrders);

// ✅ Update Order Status
router.put("/update", updateOrderStatus);

module.exports = router;
