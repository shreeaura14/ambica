const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc  Place a new order
// @route POST /api/orders
// @access Private
const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, deliveryMethod, notes } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Load user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = parseFloat((subtotal * 0.18).toFixed(2));
    const shippingCharge = deliveryMethod === "express" ? 500 : 0;
    const total = parseFloat((subtotal + tax + shippingCharge).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      shippingAddress,
      paymentMethod: paymentMethod || "bank_transfer",
      deliveryMethod: deliveryMethod || "standard",
      subtotal,
      tax,
      shippingCharge,
      total,
      notes: notes || "",
    });

    // Clear the cart after order is placed
    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("placeOrder:", error);
    res.status(500).json({ message: "Server error placing order" });
  }
};

// @desc  Get logged-in user's orders
// @route GET /api/orders/my
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error("getMyOrders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc  Get a single order by ID (owner or admin)
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only owner or admin may see the order
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("getOrderById:", error);
    res.status(500).json({ message: "Server error fetching order" });
  }
};

// @desc  Get all orders (admin)
// @route GET /api/orders
// @access Admin
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { orderStatus: status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ success: true, count: orders.length, total, data: orders });
  } catch (error) {
    console.error("getAllOrders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;

    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    console.error("updateOrderStatus:", error);
    res.status(500).json({ message: "Server error updating order" });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
