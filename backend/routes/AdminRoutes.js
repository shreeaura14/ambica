const router = require("express").Router();
const {
  getStats,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  updateUserRole,
  getAdminQuotes,
  updateQuoteStatus,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All admin routes are protected + admin-only
router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/orders", getAdminOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.get("/users", getAdminUsers);
router.put("/users/:id/role", updateUserRole);
router.get("/quotes", getAdminQuotes);
router.put("/quotes/:id/status", updateQuoteStatus);

module.exports = router;
