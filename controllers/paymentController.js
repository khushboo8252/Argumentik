const Order = require("../models/Order");

exports.processPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Ensure order is pending before allowing COD
    if (order.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Order is not in a valid state for COD payment" });
    }

    // Update payment details and confirm the order
    order.paymentMethod = "COD";
    order.paymentStatus = "Unpaid"; // COD orders are unpaid until delivery
    order.status = "Confirmed"; // Move status to Confirmed

    await order.save();

    res.json({
      success: false,
      message: "Order placed successfully with Cash on Delivery",
      order
    });

  } catch (error) {
    console.error("Error processing COD payment:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};
