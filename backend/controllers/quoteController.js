const Quote = require("../models/Quote");

// @desc  Submit a new quote request
// @route POST /api/quotes
// @access Public (or logged-in user)
const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, company, product, quantity, industry, location, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const quote = await Quote.create({
      user: req.user?._id || null,
      name,
      email,
      phone,
      company: company || "",
      product: product || "General Inquiry",
      quantity: quantity || "1 Unit / Sample",
      industry: industry || "",
      location: location || "N/A",
      message: message || "",
    });

    res.status(201).json({ success: true, data: quote });
  } catch (error) {
    console.error("submitQuote:", error);
    res.status(500).json({ message: "Server error submitting quote" });
  }
};

// @desc  Get logged-in user's own quotes
// @route GET /api/quotes/my
// @access Private
const getMyQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    console.error("getMyQuotes:", error);
    res.status(500).json({ message: "Server error fetching quotes" });
  }
};

module.exports = { submitQuote, getMyQuotes };
