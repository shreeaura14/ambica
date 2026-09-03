const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Quote = require("../models/Quote");

// @desc  Get dashboard stats
// @route GET /api/admin/stats
// @access Admin
const getStats = async (req, res) => {
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      pendingOrders,
      newQuotes,
      revenueData,
      lowStockProducts,
    ] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments({ orderStatus: "placed" }),
      Quote.countDocuments({ status: "new" }),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Product.find({ isActive: true, stock: { $lt: 50 } })
        .select("name stock")
        .limit(5),
    ]);

    const totalRevenue = revenueData[0]?.total ?? 0;

    // Monthly revenue for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalProducts,
        pendingOrders,
        newQuotes,
        totalRevenue,
        monthlyRevenue,
        lowStockProducts,
      },
    });
  } catch (error) {
    console.error("getStats:", error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
};

// @desc  Get all orders for admin with pagination + filter
// @route GET /api/admin/orders?status=&page=&limit=
// @access Admin
const getAdminOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { orderStatus: status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("user", "name email company phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: orders.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      data: orders,
    });
  } catch (error) {
    console.error("getAdminOrders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// @desc  Update order status
// @route PUT /api/admin/orders/:id/status
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

// @desc  Get all users
// @route GET /api/admin/users?page=&limit=
// @access Admin
const getAdminUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(),
    ]);

    res.json({
      success: true,
      count: users.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      data: users,
    });
  } catch (error) {
    console.error("getAdminUsers:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// @desc  Update user role
// @route PUT /api/admin/users/:id/role
// @access Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("updateUserRole:", error);
    res.status(500).json({ message: "Server error updating user role" });
  }
};

// @desc  Get all quotes for admin
// @route GET /api/admin/quotes?status=&page=&limit=
// @access Admin
const getAdminQuotes = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [quotes, total] = await Promise.all([
      Quote.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Quote.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: quotes.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      data: quotes,
    });
  } catch (error) {
    console.error("getAdminQuotes:", error);
    res.status(500).json({ message: "Server error fetching quotes" });
  }
};

// @desc  Update quote status
// @route PUT /api/admin/quotes/:id/status
// @access Admin
const updateQuoteStatus = async (req, res) => {
  try {
    const { status, adminNotes, assignedTo, quotedPrice } = req.body;
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (status) quote.status = status;
    if (adminNotes !== undefined) quote.adminNotes = adminNotes;
    if (assignedTo !== undefined) quote.assignedTo = assignedTo;
    if (quotedPrice !== undefined) quote.quotedPrice = quotedPrice;

    await quote.save();
    res.json({ success: true, data: quote });
  } catch (error) {
    console.error("updateQuoteStatus:", error);
    res.status(500).json({ message: "Server error updating quote" });
  }
};

module.exports = {
  getStats,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  updateUserRole,
  getAdminQuotes,
  updateQuoteStatus,
};
