const Product = require("../models/Product");

// @desc  Get all products with search, filters, pagination
// @route GET /api/products?q=&category=&application=&form=&featured=&minPrice=&maxPrice=&page=&limit=
// @access Public
const getProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      application,
      form,
      featured,
      minPrice,
      maxPrice,
      page = 1,
      limit = 100,
    } = req.query;

    const filter = { isActive: true };

    if (q && q.trim()) filter.$text = { $search: q.trim() };
    if (category) filter.category = category;
    if (form) filter.form = form;
    if (application) filter.application = { $regex: application, $options: "i" };
    if (featured === "true") filter.featured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: products,
    });
  } catch (error) {
    console.error("getProducts:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// @desc  Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("getProductById:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// @desc  Get product by slug
// @route GET /api/products/slug/:slug
// @access Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("getProductBySlug:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// @desc  Create a product
// @route POST /api/products
// @access Admin
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    // Auto-generate slug if not provided
    if (!req.body.slug) {
      req.body.slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    }
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("createProduct:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "A product with this slug already exists. Please use a different name." });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ message: `Validation error: ${messages}` });
    }
    res.status(500).json({ message: error.message || "Server error creating product" });
  }
};

// @desc  Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("updateProduct:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

// @desc  Soft-delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    product.isActive = false;
    await product.save();
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("deleteProduct:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
