const Order = require("../models/Order");

exports.processPayment = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); // Debugging line

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Ensure order is in a valid state to accept COD
    if (order.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Order is not in a valid state for COD" });
    }

    // Update order details
    order.paymentMethod = "COD";
    order.paymentStatus = "Unpaid"; // Since it's Cash on Delivery
    order.status = "Confirmed"; // Change status to Confirmed

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully with Cash on Delivery",
      order
    });

  } catch (error) {
    console.error("Error processing COD order:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};
