const Order = require("../models/Order");

// Note: In real life you would:
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
//
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET
// });

// @desc  Create a new Razorpay order
// @route POST /api/payments/create-order
// @access Private
const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Mock Razorpay creation. If real:
    // const options = { amount: order.total * 100, currency: "INR", receipt: orderId };
    // const rzOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: {
        id: "order_mockRzpy" + Date.now(), // rzOrder.id
        amount: order.total * 100,
        currency: "INR",
      },
    });
  } catch (error) {
    console.error("createPaymentOrder:", error);
    res.status(500).json({ message: "Server error creating payment order" });
  }
};

// @desc  Verify payment success
// @route POST /api/payments/verify
// @access Private
const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Real signature check:
    // const sign = razorpayOrderId + "|" + razorpayPaymentId;
    // const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");
    // if (razorpaySignature !== expectedSign) throw new Error("Invalid signature");

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    // order.transactionId = razorpayPaymentId; // you can add transaction id field
    await order.save();

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("verifyPayment:", error);
    res.status(400).json({ message: "Payment verification failed" });
  }
};

module.exports = { createPaymentOrder, verifyPayment };
