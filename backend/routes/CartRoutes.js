const router = require("express").Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// All cart routes require a logged-in user
router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/clear", clearCart);       // must be above /:productId
router.delete("/:productId", removeCartItem);

module.exports = router;
