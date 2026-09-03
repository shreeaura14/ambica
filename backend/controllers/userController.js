const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc  Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone, company });

    res.status(201).json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("registerUser:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc  Login user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    if (!user.isActive) return res.status(403).json({ message: "Account has been deactivated" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("loginUser:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc  Get current user profile
// @route GET /api/users/me
// @access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const orderCount = await Order.countDocuments({ user: req.user._id });
    const totalSpentAgg = await Order.aggregate([
      { $match: { user: req.user._id, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalSpent = totalSpentAgg[0]?.total ?? 0;

    res.json({
      success: true,
      data: { ...user.toObject(), orderCount, totalSpent },
    });
  } catch (error) {
    console.error("getMe:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// @desc  Update current user profile
// @route PUT /api/users/me
// @access Private
const updateMe = async (req, res) => {
  try {
    const { name, phone, company, gstNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, company, gstNumber },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("updateMe:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

// @desc  Change password
// @route PUT /api/users/me/password
// @access Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("changePassword:", error);
    res.status(500).json({ message: "Server error changing password" });
  }
};

module.exports = { registerUser, loginUser, getMe, updateMe, changePassword };
