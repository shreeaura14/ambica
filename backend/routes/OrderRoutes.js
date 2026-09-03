const router = require("express").Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// User routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;