const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/me/password", protect, changePassword);

module.exports = router;