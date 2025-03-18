const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  status: { type: String, enum: ["Processing", "Completed", "Cancelled"], default: "Processing" }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
