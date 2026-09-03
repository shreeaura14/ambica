const router = require("express").Router();
const {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/products/slug/:slug  — must be ABOVE /:id so it doesn't get swallowed
router.get("/slug/:slug", getProductBySlug);

router
  .route("/")
  .get(getProducts)
  .post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;