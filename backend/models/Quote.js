const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    // Who submitted
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    company: { type: String, default: "" },

    // What they want
    product: { type: String, required: true },
    quantity: { type: String, required: true },
    industry: { type: String, default: "" },
    location: { type: String, required: true },
    message: { type: String, default: "" },

    // Admin management
    status: {
      type: String,
      enum: ["new", "in_review", "quoted", "accepted", "rejected"],
      default: "new",
    },
    assignedTo: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    quotedPrice: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
