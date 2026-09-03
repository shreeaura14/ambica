const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, default: "kg" },
    purity: { type: String, default: "" },
    category: {
      type: String,
      default: "other",
      trim: true,
    },
    application: { type: String, default: "" },
    form: {
      type: String,
      default: "other",
      trim: true,
    },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    specifications: { type: Map, of: String, default: {} },
    applications: [{ type: String }],
    packaging: [{ type: String }],
    safety: [{ type: String }],
  },
  { timestamps: true }
);

// Full-text search index
productSchema.index({ name: "text", description: "text", application: "text" });

module.exports = mongoose.model("Product", productSchema);