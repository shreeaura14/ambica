const router = require("express").Router();
const { submitQuote, getMyQuotes } = require("../controllers/quoteController");
const { protect } = require("../middleware/authMiddleware");

// Public: anyone can submit a quote (token is optional, controller handles nullcheck)
router.post("/", submitQuote);

// Private: only the logged-in user can see their own quotes
router.get("/my", protect, getMyQuotes);

module.exports = router;
